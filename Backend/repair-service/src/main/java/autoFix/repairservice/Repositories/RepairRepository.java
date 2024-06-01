package autoFix.repairservice.Repositories;

import autoFix.repairservice.Entities.Repair;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepairRepository extends JpaRepository<Repair, Long> {
    List<Repair> findByIdCar(Long id_car);

    @Query(value = "SELECT r.id_car\n" +
            "FROM repair r\n" +
            "WHERE r.id = :idRepair", nativeQuery = true)
    Long findIdCarByIdRepair(@Param("idRepair") Long idRepair);
}
