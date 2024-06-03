package autoFix.carservice.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Repair {
    private Long id;
    private LocalDateTime dateTimeEntry;
    private Integer amount;
    private Float totalDiscount;
    private Float totalFee;
    private Float iva;
    private Float finalCost;
    private LocalDateTime dateTimeExit;
    private LocalDateTime dateTimePickUp;
    private Integer bonus;
    private Long idCar;
}
