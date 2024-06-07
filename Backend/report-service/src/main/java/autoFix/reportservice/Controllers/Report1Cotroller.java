package autoFix.reportservice.Controllers;

import autoFix.reportservice.Models.Report1;
import autoFix.reportservice.Services.Report1Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/report/report1")
public class Report1Cotroller {
    @Autowired
    private Report1Service report1Service;

    @GetMapping("/{year}/{month}")
    public ResponseEntity<List<Report1>> getReport1(@PathVariable int year, @PathVariable int month) {
        List<Report1> reports = report1Service.getReport(year, month);
        return ResponseEntity.ok(reports);
    }
}
