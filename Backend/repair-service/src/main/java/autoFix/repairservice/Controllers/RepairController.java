package autoFix.repairservice.Controllers;

import autoFix.repairservice.Entities.Repair;
import autoFix.repairservice.Services.RepairService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/repair")
@CrossOrigin
public class RepairController {
    @Autowired
    private RepairService repairService;

    @GetMapping("/getByIdCar/{id_car}")
    public ResponseEntity<List<Repair>> getByIdCar(@PathVariable("id_car") Long id_car) {
        List<Repair> repairs = repairService.getByIdCar(id_car);
        return ResponseEntity.ok(repairs);
    }

    @DeleteMapping("/{idRepair}")
    public ResponseEntity<Boolean> delete(@PathVariable("idRepair") Long idRepair) throws Exception {
        var isDeleted = repairService.delete(idRepair);
        return ResponseEntity.ok(isDeleted);
    }
}
