package autoFix.dataservice.Controllers;

import autoFix.dataservice.Services.DiscountNumberRepairsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/data/discountNumberRepairs")
public class DiscountNumberRepairsController {
    @Autowired
    private DiscountNumberRepairsService discountNumberRepairsService;

    @GetMapping("/{typeEngine}/{numberRepairs}")
    public ResponseEntity<Float> getAllDiscountNumberRepairs(@PathVariable String typeEngine, @PathVariable Integer numberRepairs) {
        Float discount = discountNumberRepairsService.getDiscount(typeEngine, numberRepairs);
        return ResponseEntity.ok(discount);
    }
}
