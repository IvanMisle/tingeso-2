package autoFix.reportservice.Services;

import autoFix.reportservice.Models.Report2;
import autoFix.reportservice.Models.TypeRepair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class Report2Service {
    @Autowired
    private RestTemplate restTemplate;

    public List<Report2> getReport(Integer month) {
        List<TypeRepair> typeRepairs = restTemplate.exchange(
                "http://data-service/data/TypeRepair/",
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<TypeRepair>>() {}
        ).getBody();
        List<Report2> report = new ArrayList<>();
        for (TypeRepair typeRepair : typeRepairs) {
            Report2 report2 = new Report2();
            report2.setName(typeRepair.getName());
            report2.setMonth1(month);
            Integer count1 ;
            Integer cost1;
            cost1 = restTemplate.getForObject("http://repair-service/repair/typeRepair/getCostByMonthAndName/" +
                    month + "/" + typeRepair.getName(), Integer.class);
            count1 = restTemplate.getForObject("http://repair-service/repair/typeRepair/getCountByMonthAndName/" +
                    month + "/" + typeRepair.getName(), Integer.class);
            report2.setMonth1Cost(cost1);
            report2.setMonth1Count(count1);
            int month2 = month - 1;
            if (month2 == 0) {
                month2 = 12;
            }
            report2.setMonth2(month2);
            Integer count2;
            Integer cost2;
            cost2 = restTemplate.getForObject("http://repair-service/repair/typeRepair/getCostByMonthAndName/" +
                    month2 + "/" + typeRepair.getName(), Integer.class);
            count2 = restTemplate.getForObject("http://repair-service/repair/typeRepair/getCountByMonthAndName/" +
                    month2 + "/" + typeRepair.getName(), Integer.class);
            report2.setMonth2Cost(cost2);
            report2.setMonth2Count(count2);
            int month3 = month2 - 1;
            if (month3 == 0) {
                month3 = 12;
            }
            report2.setMonth3(month3);
            Integer count3;
            Integer cost3;
            cost3 = restTemplate.getForObject("http://repair-service/repair/typeRepair/getCostByMonthAndName/" +
                    month3 + "/" + typeRepair.getName(), Integer.class);
            count3 = restTemplate.getForObject("http://repair-service/repair/typeRepair/getCountByMonthAndName/" +
                    month3 + "/" + typeRepair.getName(), Integer.class);
            report2.setMonth3Cost(cost3);
            report2.setMonth3Count(count3);
            if (cost2 == 0 || cost1 == 0) {
                report2.setVar21Cost(null);
                report2.setVar21Count(null);
            } else {
                report2.setVar21Cost(((cost1 - cost2)/cost2)*100);
                report2.setVar21Count(((count1 - count2)/count2)*100);
            }
            if (cost3 == 0 || cost2 == 0) {
                report2.setVar32Cost(null);
                report2.setVar32Count(null);
            } else {
                report2.setVar32Cost(((cost2 - cost3)/cost3)*100);
                report2.setVar32Count(((count2 - count3)/count3)*100);
            }
            report.add(report2);
        }
        return report;
    }
}
