package autoFix.repairservice.Controllers;

import autoFix.repairservice.Models.Report;
import autoFix.repairservice.Services.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("repair/report")
public class ReportController {
    @Autowired
    private ReportService reportService;

    @GetMapping("/")
    public ResponseEntity<List<Report>> getReport() {
        List<Report> reports = reportService.getReport();
        if (reports.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(reports);
    }
}
