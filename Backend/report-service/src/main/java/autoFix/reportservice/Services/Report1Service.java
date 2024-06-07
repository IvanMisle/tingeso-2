package autoFix.reportservice.Services;

import autoFix.reportservice.Models.Car;
import autoFix.reportservice.Models.Report1;
import autoFix.reportservice.Models.TypeRepair;
import autoFix.reportservice.Models.TypeRepairRepair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class Report1Service {
    @Autowired
    private RestTemplate restTemplate;

    public List<Report1> getReport(Integer year, Integer month) {
        List<TypeRepair> typeRepairs = restTemplate.exchange(
                "http://data-service/data/TypeRepair/",
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<TypeRepair>>() {}
        ).getBody();
        List<Report1> reports = new ArrayList<>();
        for (TypeRepair typeRepair : typeRepairs) {
            Report1 report1 = new Report1();
            report1.setType(typeRepair.getName());
            List<TypeRepairRepair> typeRepairRepairs = restTemplate.exchange(
                    "http://repair-service/repair/typeRepair/getByDate/" + year + "/" + month + "/"
                    + typeRepair.getName(),
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<List<TypeRepairRepair>>() {}
            ).getBody();
            if (typeRepairRepairs == null) {
                report1.setFurgonetaCost(0);
                report1.setFurgonetaCount(0);
                report1.setPickupCost(0);
                report1.setPickupCount(0);
                report1.setHatchbackCost(0);
                report1.setHatchbackCount(0);
                report1.setSedanCost(0);
                report1.setSedanCount(0);
                report1.setSuvCost(0);
                report1.setSuvCount(0);
                report1.setTotalCost(0);
                report1.setTotalCount(0);
            } else {
                int sedanCount = 0;
                int sedanCost = 0;
                int hatchbackCount = 0;
                int hatchbackCost = 0;
                int suvCount = 0;
                int suvCost = 0;
                int pickupCount = 0;
                int pickupCost = 0;
                int furgonetaCount = 0;
                int furgonetaCost = 0;
                int totalCost = 0;
                int totalCount = 0;
                for (TypeRepairRepair typeRepairRepair : typeRepairRepairs) {

                    Car car = restTemplate.getForObject("http://car-service/car/getByLicensePlate/"
                            + typeRepairRepair.getLicensePlate(), Car.class);
                    if(Objects.equals(car.getType(), "SUV")) {
                        suvCount++;
                        suvCost += typeRepairRepair.getCost();
                    } else if (Objects.equals(car.getType(), "Hatchback")) {
                        hatchbackCount++;
                        hatchbackCost += typeRepairRepair.getCost();
                    } else if(Objects.equals(car.getType(), "Sedán")) {
                        sedanCount++;
                        sedanCost += typeRepairRepair.getCost();
                    } else if(Objects.equals(car.getType(), "Pickup")) {
                        pickupCount++;
                        pickupCost += typeRepairRepair.getCost();
                    } else if(Objects.equals(car.getType(), "Furgoneta")) {
                        furgonetaCount++;
                        furgonetaCost += typeRepairRepair.getCost();
                    }
                    totalCount++;
                    totalCost += typeRepairRepair.getCost();
                }
                report1.setFurgonetaCost(furgonetaCost);
                report1.setFurgonetaCount(furgonetaCount);
                report1.setPickupCost(pickupCost);
                report1.setPickupCount(pickupCount);
                report1.setHatchbackCost(hatchbackCost);
                report1.setHatchbackCount(hatchbackCount);
                report1.setSedanCost(sedanCost);
                report1.setSedanCount(sedanCount);
                report1.setSuvCost(suvCost);
                report1.setSuvCount(suvCount);
                report1.setTotalCost(totalCost);
                report1.setTotalCount(totalCount);
            }
            reports.add(report1);
        }
        return reports;
    }
}
