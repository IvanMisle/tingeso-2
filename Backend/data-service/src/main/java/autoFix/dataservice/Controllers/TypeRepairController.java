package autoFix.dataservice.Controllers;

import autoFix.dataservice.Entities.TypeRepair;
import autoFix.dataservice.Services.TypeRepairService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/data/TypeRepair")
public class TypeRepairController {
    @Autowired
    private TypeRepairService typeRepairService;

    @GetMapping("/")
    public ResponseEntity<List<TypeRepair>> getAll() {
        List<TypeRepair> typeRepairs = typeRepairService.getAll();
        return ResponseEntity.ok(typeRepairs);
    }
}
