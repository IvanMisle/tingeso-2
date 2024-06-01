package autoFix.repairservice.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Car {
    private Long id;
    private String licensePlate;
    private String brand;
    private String model;
    private String type;
    private Integer manufactureYear;
    private String typeEngine;
    private Integer numberSeats;
    private Integer mileage;
}
