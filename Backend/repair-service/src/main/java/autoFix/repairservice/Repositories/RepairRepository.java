package autoFix.repairservice.Repositories;

import autoFix.repairservice.Entities.Repair;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepairRepository extends JpaRepository<Repair, Long> {
    List<Repair> findByIdCar(Long id_car);
}
