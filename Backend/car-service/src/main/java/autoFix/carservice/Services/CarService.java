package autoFix.carservice.Services;

import autoFix.carservice.Entities.Car;
import autoFix.carservice.Models.Repair;
import autoFix.carservice.Repositories.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class CarService {
    @Autowired
    private CarRepository carRepository;
    @Autowired
    private RestTemplate restTemplate;

    public Car save(Car car) {
        return carRepository.save(car);
    }

    public List<Car> findAll() {
        return carRepository.findAll();
    }

    public Car findById(Long id) {
        return carRepository.findById(id).get();
    }

    public Car findByLicensePlate(String licensePlate) {
        return carRepository.findByLicensePlate(licensePlate);
    }

    public Integer getBonus(Long id) {
        List<Repair> repairs = restTemplate.exchange(
                "http://repair-service/repair/getByIdCar/" + id,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Repair>>() {}
        ).getBody();
        if (repairs != null && !repairs.isEmpty()) {
            for (Repair repair : repairs) {
                if (repair.getBonus() != null && repair.getBonus() > 0) {
                    return 0;
                }
            }
        }
        Car car = carRepository.findById(id).get();
        return restTemplate.getForObject("http://data-service/data/bonus/" + car.getBrand(), Integer.class);
    }

    public boolean deleteById(Long id) throws Exception {
        try {
            List<Repair> repairs = restTemplate.exchange(
                    "http://repair-service/repair/getByIdCar/" + id,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<List<Repair>>() {}
            ).getBody();
            if (repairs != null && !repairs.isEmpty()) {
                for (Repair repair : repairs) {
                    restTemplate.delete("http://repair-service/repair/" + repair.getId());
                }
            }
            carRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}
