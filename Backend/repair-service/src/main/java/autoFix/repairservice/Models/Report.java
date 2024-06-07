package autoFix.repairservice.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Report {
    private String licensePlate;
    private String brand;
    private String model;
    private String type;
    private Integer manufactureYear;
    private String typeEngine;
    private LocalDateTime dateTimeEntry;
    private Integer amount;
    private Float totalFee;
    private Float totalDiscount;
    private Float iva;
    private Float finalCost;
    private LocalDateTime dateTimeExit;
    private LocalDateTime dateTimePickUp;
}
