package autoFix.repairservice.Controllers;

import autoFix.repairservice.Entities.Repair;
import autoFix.repairservice.Models.Car;
import autoFix.repairservice.Services.RepairService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/repair")
public class RepairController {
    @Autowired
    private RepairService repairService;

    @GetMapping("/{id}")
    public ResponseEntity<Repair> getRepairById(@PathVariable Long id) {
        Repair repair = repairService.getByID(id);
        return ResponseEntity.ok(repair);
    }

    @GetMapping("/getByIdCar/{id_car}")
    public ResponseEntity<List<Repair>> getByIdCar(@PathVariable("id_car") Long id_car) {
        List<Repair> repairs = repairService.getByIdCar(id_car);
        return ResponseEntity.ok(repairs);
    }

    @GetMapping("/getBonus/{idRepair}")
    public ResponseEntity<Integer> getbonus(@PathVariable Long idRepair) {
        Integer bonus = repairService.getBonus(idRepair);
        return ResponseEntity.ok(bonus);
    }

    @PostMapping("/")
    public ResponseEntity<Repair> save(@RequestBody Repair repair) {
        Repair result = repairService.save(repair);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/calculate/{idRepair}")
    private ResponseEntity<Repair> calculate(@PathVariable Long idRepair, @RequestBody Car car) {
        Repair repair = repairService.calculateCost(idRepair, car);
        return ResponseEntity.ok(repair);
    }

    @PutMapping("/")
    public ResponseEntity<Repair> update(@RequestBody Repair repair) {
        Repair result = repairService.save(repair);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{idRepair}")
    public ResponseEntity<Boolean> delete(@PathVariable("idRepair") Long idRepair) throws Exception {
        var isDeleted = repairService.delete(idRepair);
        return ResponseEntity.ok(isDeleted);
    }
}
