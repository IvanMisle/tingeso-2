package autoFix.dataservice.Controllers;

import autoFix.dataservice.Services.FeeMileageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/data/feeMileage")
public class FeeMileageController {
    @Autowired
    private FeeMileageService feeMileageService;

    @GetMapping("/{typeCar}/{mileage}")
    public ResponseEntity<Float> getFeeMileage(@PathVariable String typeCar, @PathVariable Integer mileage) {
        Float fee = feeMileageService.getFee(typeCar, mileage);
        return ResponseEntity.ok(fee);
    }
}
