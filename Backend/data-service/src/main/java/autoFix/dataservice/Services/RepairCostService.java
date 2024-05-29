package autoFix.dataservice.Services;

import autoFix.dataservice.Repositories.RepairCostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RepairCostService {
    @Autowired
    private RepairCostRepository repairCostRepository;

    public Integer getCostRepair(String typeEngine, Integer typeRepair) {
        return repairCostRepository.getCost(typeEngine, typeRepair);
    }
}
