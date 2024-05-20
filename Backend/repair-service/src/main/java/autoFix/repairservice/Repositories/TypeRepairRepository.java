package autoFix.repairservice.Repositories;

import autoFix.repairservice.Entities.TypeRepair;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TypeRepairRepository extends JpaRepository<TypeRepair, Long> {
    List<TypeRepair> findByIdRepair(Long idRepair);
}
