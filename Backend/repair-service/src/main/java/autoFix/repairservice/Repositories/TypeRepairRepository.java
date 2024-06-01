package autoFix.repairservice.Repositories;

import autoFix.repairservice.Entities.TypeRepair;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TypeRepairRepository extends JpaRepository<TypeRepair, Long> {
    List<TypeRepair> findByIdRepair(Long idRepair);

    @Query(value = "SELECT tr.type_repair\n" +
            "FROM type_repair tr\n" +
            "WHERE tr.id_repair = :idRepair", nativeQuery = true)
    List<String> findNamesByIdRepair(Long idRepair);
}
