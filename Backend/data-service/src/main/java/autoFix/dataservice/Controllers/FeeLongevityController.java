package autoFix.dataservice.Controllers;

import autoFix.dataservice.Services.FeeLongevityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/data/feeLongevity")
public class FeeLongevityController {
    @Autowired
    private FeeLongevityService feeLongevityService;

    @GetMapping("/{manufactureYear}/{typeCar}")
    public ResponseEntity<Float> getFee(@PathVariable Integer manufactureYear, @PathVariable String typeCar) {
        Float fee = feeLongevityService.getFee(manufactureYear, typeCar);
        return ResponseEntity.ok(fee);
    }
}
