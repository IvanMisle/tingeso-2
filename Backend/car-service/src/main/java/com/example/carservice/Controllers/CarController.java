package com.example.carservice.Controllers;

import com.example.carservice.Entities.Car;
import com.example.carservice.Services.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("api/v1/car")
@CrossOrigin
public class CarController {
    @Autowired
    private CarService carService;

    @PostMapping("/")
    public ResponseEntity<Car> save(@RequestBody Car car) {
        Car newCar = carService.save(car);
        return ResponseEntity.ok(newCar);
    }
}
