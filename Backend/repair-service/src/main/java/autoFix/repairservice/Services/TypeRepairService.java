package autoFix.repairservice.Services;

import autoFix.repairservice.Entities.Repair;
import autoFix.repairservice.Entities.TypeRepair;
import autoFix.repairservice.Models.Car;
import autoFix.repairservice.Repositories.RepairRepository;
import autoFix.repairservice.Repositories.TypeRepairRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class TypeRepairService {
    @Autowired
    private TypeRepairRepository typeRepairRepository;

    @Autowired
    private RepairRepository repairRepository;

    @Autowired
    private RepairService repairService;

    @Autowired
    private RestTemplate restTemplate;

    public List<TypeRepair> getByIdRepair(Long idRepair) {
        return typeRepairRepository.findByIdRepair(idRepair);
    }

    public List<TypeRepair> save(Long idRepair, List<Integer> typesNumbers) {
        List<TypeRepair> typeRepairs = typeRepairRepository.findByIdRepair(idRepair);
        if (!typeRepairs.isEmpty()) {
            typeRepairRepository.deleteAll(typeRepairs);
        }
        Long idCar = repairRepository.findIdCarByIdRepair(idRepair);
        System.out.println(idCar);
        List<TypeRepair> newTypeRepairs = new ArrayList<>();
        Car car = restTemplate.getForObject("http://car-service/car/" + idCar, Car.class);
        for (Integer typeNumber : typesNumbers) {
            TypeRepair newTypeRepair = new TypeRepair();
            newTypeRepair.setIdRepair(idRepair);
            newTypeRepair.setLicensePlate(car.getLicensePlate());
            newTypeRepair.setDate(LocalDateTime.now());
            Integer cost = restTemplate.getForObject("http://data-service/data/RepairCost/" +
                    car.getTypeEngine() + "/" + typeNumber, Integer.class);
            newTypeRepair.setCost(cost);
            String name = restTemplate.getForObject("http://data-service/data/TypeRepair/getNameByNumber/"
            + typeNumber, String.class);
            newTypeRepair.setTypeRepair(name);
            newTypeRepairs.add(typeRepairRepository.save(newTypeRepair));
        }
        repairService.calculateCost(idRepair, car);
        return newTypeRepairs;
    }

    public List<Integer> getNumberByIdRepair(Long idRepair) {
        List<String> names = typeRepairRepository.findNamesByIdRepair(idRepair);
        List<Integer> numbers = new ArrayList<>();
        for (String name : names) {
            numbers.add(restTemplate.getForObject("http://data-service/data/TypeRepair/getNumberByName?name=" + name, Integer.class));
        }
        return numbers;
    }
}
