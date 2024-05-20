package autoFix.repairservice.Services;

import autoFix.repairservice.Repositories.RepairRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RepairService {
    @Autowired
    private RepairRepository repairRepository;

    public boolean delete(Long id) throws Exception {
        try{
            List<TypeRepair_Repair> types = typeRepair_RepairRepository.getByIdRepair(id);
            if (!types.isEmpty()) {
                typeRepair_RepairRepository.deleteAll(types);
            }
            Ticket ticket = ticketRepository.findById_repair(id);
            if (ticket != null) {
                ticketRepository.delete(ticket);
            }
            repairRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}
