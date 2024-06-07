package autoFix.reportservice.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Report1 {
    private String type;
    private Integer sedanCount;
    private Integer sedanCost;
    private Integer hatchbackCount;
    private Integer hatchbackCost;
    private Integer suvCount;
    private Integer suvCost;
    private Integer pickupCount;
    private Integer pickupCost;
    private Integer furgonetaCount;
    private Integer furgonetaCost;
    private Integer totalCost;
    private Integer totalCount;
}
