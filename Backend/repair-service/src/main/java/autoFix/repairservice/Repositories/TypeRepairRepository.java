package autoFix.repairservice.Repositories;

import autoFix.repairservice.Entities.TypeRepair;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TypeRepairRepository extends JpaRepository<TypeRepair, Long> {
    List<TypeRepair> findByIdRepair(Long idRepair);

    @Query(value = "SELECT tr.type_repair\n" +
            "FROM type_repair tr\n" +
            "WHERE tr.id_repair = :idRepair", nativeQuery = true)
    List<String> findNamesByIdRepair(Long idRepair);

    @Query(value = "SELECT *\n" +
            "FROM type_repair tr\n" +
            "WHERE YEAR(tr.date) = :year AND\n" +
            "MONTH(tr.date) = :month AND " +
            "tr.type_repair = :name", nativeQuery = true)
    List<TypeRepair> findByDateAndName(@Param("year") Integer year, @Param("month") Integer month, @Param("name") String name);
}
