package autoFix.reportservice.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TypeRepairRepair {
    private Long id;
    private String licensePlate;
    private String typeRepair;
    private LocalDateTime date;
    private Integer cost;
    private Long idRepair;
}
