package autoFix.carservice.Controllers;

import autoFix.carservice.Entities.Car;
import autoFix.carservice.Services.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/car")
@CrossOrigin
public class CarController {
    @Autowired
    private CarService carService;

    @GetMapping("/")
    public ResponseEntity<List<Car>> getAllCars() {
        List<Car> cars = carService.findAll();
        return ResponseEntity.ok(cars);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Car> getById(@PathVariable Long id) {
        Car car = carService.findById(id);
        return ResponseEntity.ok(car);
    }

    @PostMapping("/")
    public ResponseEntity<Car> save(@RequestBody Car car) {
        Car newCar = carService.save(car);
        return ResponseEntity.ok(newCar);
    }
}
