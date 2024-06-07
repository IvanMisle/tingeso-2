package autoFix.repairservice.Controllers;

import autoFix.repairservice.Entities.TypeRepair;
import autoFix.repairservice.Services.TypeRepairService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Type;
import java.util.List;

@RestController
@RequestMapping("/repair/typeRepair")
public class TypeRepairController {
    @Autowired
    private TypeRepairService typeRepairService;

    @GetMapping("/getByDate/{year}/{month}/{name}")
    public ResponseEntity<List<TypeRepair>> getByDateAndName(@PathVariable Integer year, @PathVariable Integer month, @PathVariable String name) {
        List<TypeRepair> typeRepairs = typeRepairService.getByDateAndName(year, month, name);
        return ResponseEntity.ok(typeRepairs);
    }

    @GetMapping("/getByIdRepair/{idRepair}")
    public ResponseEntity<List<TypeRepair>> getByIdRepair(@PathVariable Long idRepair) {
        List<TypeRepair> typeRepairs = typeRepairService.getByIdRepair(idRepair);
        return ResponseEntity.ok(typeRepairs);
    }

    @GetMapping("/getNumbersByIdRepair/{idRepair}")
    public ResponseEntity<List<Integer>> getNumbersByIdRepair(@PathVariable Long idRepair) {
        List<Integer> numbers = typeRepairService.getNumberByIdRepair(idRepair);
        return ResponseEntity.ok(numbers);
    }

    @GetMapping("/getCostByMonthAndName/{month}/{name}")
    public ResponseEntity<Integer> getCostByMonthAndName(@PathVariable Integer month, @PathVariable String name) {
        Integer cost = typeRepairService.getCostByMonthAndName(month, name);
        return ResponseEntity.ok(cost);
    }

    @GetMapping("/getCountByMonthAndName/{month}/{name}")
    public ResponseEntity<Integer> getCountByMonthAndName(@PathVariable Integer month, @PathVariable String name) {
        Integer count = typeRepairService.getCountByMonthAndName(month, name);
        return ResponseEntity.ok(count);
    }

    @PostMapping("/{idRepair}")
    public ResponseEntity<List<TypeRepair>> saveTypeRepairs(@PathVariable Long idRepair, @RequestBody List<Integer> typesNumbers) {
        List<TypeRepair> typeRepairs = typeRepairService.save(idRepair, typesNumbers);
        return ResponseEntity.ok(typeRepairs);
    }
}
