package autoFix.reportservice.Controllers;

import autoFix.reportservice.Models.Report2;
import autoFix.reportservice.Services.Report2Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/report/report2")
public class Report2Controller {
    @Autowired
    private Report2Service report2Service;

    @GetMapping("/{month}")
    public ResponseEntity<List<Report2>> getReport(@PathVariable Integer month) {
        List<Report2> report = report2Service.getReport(month);
        return ResponseEntity.ok(report);
    }
}
