package autoFix.repairservice.Controllers;

import autoFix.repairservice.Entities.TypeRepair;
import autoFix.repairservice.Services.TypeRepairService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/repair/typeRepair")
public class TypeRepairController {
    @Autowired
    private TypeRepairService typeRepairService;

    @GetMapping("/getByIdRepair/{idRepair}")
    public ResponseEntity<List<TypeRepair>> getByIdRepair(@PathVariable Long idRepair) {
        List<TypeRepair> typeRepairs = typeRepairService.getByIdRepair(idRepair);
        return ResponseEntity.ok(typeRepairs);
    }
}
