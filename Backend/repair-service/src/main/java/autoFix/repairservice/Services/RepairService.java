package autoFix.repairservice.Services;

import autoFix.repairservice.Entities.Repair;
import autoFix.repairservice.Entities.TypeRepair;
import autoFix.repairservice.Models.Car;
import autoFix.repairservice.Repositories.RepairRepository;
import autoFix.repairservice.Repositories.TypeRepairRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Objects;

@Service
public class RepairService {
    @Autowired
    private RepairRepository repairRepository;

    @Autowired
    private TypeRepairRepository typeRepairRepository;

    @Autowired
    private RestTemplate restTemplate;

    public Repair getByID(Long id) {
        return repairRepository.findById(id).get();
    }

    public List<Repair> getByIdCar(Long id_car) {
        return repairRepository.findByIdCar(id_car);
    }

    public Repair save(Repair repair) {
        if (repair.getId() != null) {
            Repair oldRepair = repairRepository.findById(repair.getId()).get();
            if (!Objects.equals(oldRepair.getBonus(), repair.getBonus())) {
                Car car = restTemplate.getForObject("http://car-service/car/" + repair.getIdCar(), Car.class);
                if (repair.getBonus() > 0) {
                    restTemplate.put("http://data-service/data/bonus/setAmount/" + car.getBrand() + "/" + -1, null);
                } else {
                    restTemplate.put("http://data-service/data/bonus/setAmount/" + car.getBrand() + "/" + 1, null);
                }
            }
        } else if (repair.getBonus() > 0) {
            Car car = restTemplate.getForObject("http://car-service/car/" + repair.getIdCar(), Car.class);
            restTemplate.put("http://data-service/data/bonus/setAmount/" + car.getBrand() + "/" + -1, null);
        }
        return repairRepository.save(repair);
    }

    public Repair calculateCost(Long idRepair, Car car) {
        Repair repair = repairRepository.findById(idRepair).get();
        List<TypeRepair> typeRepairs = typeRepairRepository.findByIdRepair(idRepair);

        //Calcular monto base
        Integer cost = 0;
        for (TypeRepair type : typeRepairs) {
            cost += type.getCost();
        }
        repair.setAmount(cost);

        //Descuento por cantidad de reparaciones
        Integer numbersRepairs = repairRepository.numberRepairsByIdCar(car.getId());
        Float discountNumberRepairs = restTemplate.getForObject("http://data-service/data/discountNumberRepairs/"
                + car.getTypeEngine() + "/" + (numbersRepairs - 1), Float.class);

        //Descuento por dia de atención
        float discountDayAttention = 0f;
        LocalDateTime date = repair.getDateTimeEntry();
        if (date.getDayOfWeek().getValue() >= DayOfWeek.MONDAY.getValue() &&
                date.getDayOfWeek().getValue() <= DayOfWeek.THURSDAY.getValue() &&
                (date.getHour() >= 9 && date.getHour() <= 12)) {
            discountDayAttention = 0.1f;
        }

        //Total descuentos
        Float totalDiscount = discountNumberRepairs + discountDayAttention;
        repair.setTotalDiscount(totalDiscount);

        //Recargo por kilometraje
        Float feeMileage = restTemplate.getForObject("http://data-service/data/feeMileage/"
                + car.getType() + "/" + car.getMileage(), Float.class);

        //Recargo por antiguedad del vehiculo
        Float feeLongevity = restTemplate.getForObject("http://data-service/data/feeLongevity/"
                + car.getManufactureYear() + "/" + car.getType(), Float.class);

        //Recargo por retraso en la recogida del vehiculo
        float feeLate = 0f;
        if (repair.getDateTimePickUp() != null) {
            feeLate = ChronoUnit.DAYS.between(repair.getDateTimeExit(), repair.getDateTimePickUp()) * 0.05f;
        }

        //Recargos totales
        float totalFee = feeMileage + feeLongevity + feeLate;
        repair.setTotalFee(totalFee);

        float iva = (cost * (1 + totalFee - totalDiscount)) * 0.19f;
        repair.setIva(iva);

        float finalCost = (cost * (1 + totalFee - totalDiscount)) + iva;
        if (repair.getBonus() != null && repair.getBonus() > 0) {
            finalCost -= repair.getBonus();
        }
        repair.setFinalCost(finalCost);

        return repairRepository.save(repair);
    }

    public Integer getBonus(Long idRepair) {
        Repair repair = repairRepository.findById(idRepair).get();

        //Si la reparación ya tiene el bonus
        if (repair.getBonus() != null && repair.getBonus() > 0) {
            return repair.getBonus();
        }

        //Si ya existe una reparación de ese vehiculo que tiene bonus
        List<Repair> repairs = repairRepository.findByIdCar(repair.getIdCar());
        for (Repair r : repairs) {
            if (r.getBonus() != null && r.getBonus() > 0) {
                return 0;
            }
        }

        //Si el vehiculo no tiene bonus agregados
        Car car = restTemplate.getForObject("http://car-service/car/" + repair.getIdCar(), Car.class);
        Integer bonus = restTemplate.getForObject("http://data-service/data/bonus/" + car.getBrand(), Integer.class);
        return bonus;
    }

    public boolean delete(Long id) throws Exception{
        try {
            List<TypeRepair> types = typeRepairRepository.findByIdRepair(id);
            typeRepairRepository.deleteAll(types);
            repairRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}