package autoFix.dataservice.Controllers;

import autoFix.dataservice.Services.RepairCostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/data/RepairCost")
public class RepairCostController {
    @Autowired
    private RepairCostService repairCostService;

    @GetMapping("/{typeEngine}/{typeRepair}")
    public ResponseEntity<Integer> getRepairCost(@PathVariable String typeEngine, @PathVariable Integer typeRepair) {
        Integer cost = repairCostService.getCostRepair(typeEngine, typeRepair);
        return ResponseEntity.ok(cost);
    }
}
