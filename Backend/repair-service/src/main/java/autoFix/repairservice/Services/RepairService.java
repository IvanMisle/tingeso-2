package autoFix.repairservice.Services;

import autoFix.repairservice.Entities.Repair;
import autoFix.repairservice.Entities.TypeRepair;
import autoFix.repairservice.Models.Car;
import autoFix.repairservice.Repositories.RepairRepository;
import autoFix.repairservice.Repositories.TypeRepairRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

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
        repair.setFinalCost(finalCost);

        return repairRepository.save(repair);
    }

    public boolean delete(Long id) throws Exception{
        try {
            repairRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}