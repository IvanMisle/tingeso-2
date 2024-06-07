package autoFix.reportservice.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Report2 {
    private String name;
    private Integer month1;
    private Integer month2;
    private Integer month3;
    private Integer month1Count;
    private Integer month1Cost;
    private Integer month2Count;
    private Integer month2Cost;
    private Integer month3Count;
    private Integer month3Cost;
    private Integer var21Cost;
    private Integer var21Count;
    private Integer var32Cost;
    private Integer var32Count;
}
