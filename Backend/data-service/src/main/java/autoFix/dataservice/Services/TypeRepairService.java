package autoFix.dataservice.Services;

import autoFix.dataservice.Entities.TypeRepair;
import autoFix.dataservice.Repositories.TypeRepairRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TypeRepairService {
    @Autowired
    private TypeRepairRepository typeRepairRepository;

    public List<TypeRepair> getAll() {
        return typeRepairRepository.findAll();
    }

    public String getNameByNumber(Integer number) {
        return typeRepairRepository.findNameByNumber(number);
    }

    public Integer getNumberByName(String name) {
        return typeRepairRepository.findNumberByName(name);
    }
}
