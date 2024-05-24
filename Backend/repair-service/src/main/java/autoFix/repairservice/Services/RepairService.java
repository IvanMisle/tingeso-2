package autoFix.repairservice.Services;

import autoFix.repairservice.Entities.Repair;
import autoFix.repairservice.Repositories.RepairRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RepairService {
    @Autowired
    private RepairRepository repairRepository;

    public Repair getByID(Long id) {
        return repairRepository.findById(id).get();
    }

    public List<Repair> getByIdCar(Long id_car) {
        return repairRepository.findByIdCar(id_car);
    }

    public Repair save(Repair repair) {
        return repairRepository.save(repair);
    }

    public boolean delete(Long id) throws Exception{
        try {
            repairRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}