package autoFix.repairservice.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Repair {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    private LocalDateTime dateTimeEntry;
    private Integer amount;
    private Float totalDiscount;
    private Float totalFee;
    private Float iva;
    private Float finalCost;
    private LocalDateTime dateTimeExit;
    private LocalDateTime dateTimePickUp;
    private Long idCar;
}
