package autoFix.repairservice.Services;

import autoFix.repairservice.Entities.TypeRepair;
import autoFix.repairservice.Repositories.TypeRepairRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TypeRepairService {
    @Autowired
    private TypeRepairRepository typeRepairRepository;

    public List<TypeRepair> getByIdRepair(Long idRepair) {
        return typeRepairRepository.findByIdRepair(idRepair);
    }
}
