package autoFix.dataservice.Controllers;

import autoFix.dataservice.Services.BonusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("/data/bonus")
public class BonusController {
    @Autowired
    private BonusService bonusService;

    @GetMapping("/{brand}")
    public ResponseEntity<Integer> getBonus(@PathVariable String brand) {
        Integer bonus = bonusService.getBonus(brand);
        return ResponseEntity.ok(Objects.requireNonNullElse(bonus, 0));
    }

    @PutMapping("/setAmount/{brand}/{number}")
    public ResponseEntity<Boolean> setAmount(@PathVariable String brand, @PathVariable Integer number) throws Exception {
        var isUpdate = bonusService.changeAmount(brand, number);
        return ResponseEntity.ok(isUpdate);
    }
}
