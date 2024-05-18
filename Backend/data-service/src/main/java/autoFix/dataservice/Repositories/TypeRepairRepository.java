package autoFix.dataservice.Repositories;

import autoFix.dataservice.Entities.TypeRepair;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TypeRepairRepository extends JpaRepository<TypeRepair, Integer> {
}
