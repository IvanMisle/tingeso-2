package autoFix.reportservice.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TypeRepair {
    private Integer id;
    private Integer number;
    private String name;
    private String description;
}
