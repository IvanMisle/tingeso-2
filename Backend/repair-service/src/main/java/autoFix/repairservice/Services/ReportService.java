package autoFix.repairservice.Services;

import autoFix.repairservice.Entities.Repair;
import autoFix.repairservice.Models.Car;
import autoFix.repairservice.Models.Report;
import autoFix.repairservice.Repositories.RepairRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReportService {
    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private RepairRepository repairRepository;

    public List<Report> getReport() {
        List<Car> cars = restTemplate.exchange(
                "http://car-service/car/",
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Car>>() {}
        ).getBody();
        if (cars == null || cars.isEmpty()) {
            return null;
        }
        List<Report> reports = new ArrayList<>();
        for (Car car : cars) {
            List<Repair> repairs = repairRepository.findByIdCar(car.getId());
            if (repairs != null && !repairs.isEmpty()) {
                for (Repair repair : repairs) {
                    Report report = new Report();
                    report.setLicensePlate(car.getLicensePlate());
                    report.setBrand(car.getBrand());
                    report.setModel(car.getModel());
                    report.setType(car.getType());
                    report.setManufactureYear(car.getManufactureYear());
                    report.setTypeEngine(car.getTypeEngine());
                    report.setDateTimeEntry(repair.getDateTimeEntry());
                    report.setAmount(repair.getAmount());
                    report.setTotalFee(repair.getTotalFee());
                    if (repair.getBonus() != null) {
                        report.setTotalDiscount(repair.getTotalDiscount() - repair.getBonus());
                    } else {
                        report.setTotalDiscount(repair.getTotalDiscount());
                    }
                    report.setIva(repair.getIva());
                    report.setFinalCost(repair.getFinalCost());
                    report.setDateTimeExit(repair.getDateTimeExit());
                    report.setDateTimePickUp(repair.getDateTimePickUp());
                    reports.add(report);
                }
            }
        }
        return reports;
    }
}
