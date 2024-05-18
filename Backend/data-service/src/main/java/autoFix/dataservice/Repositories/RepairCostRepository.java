package autoFix.dataservice.Repositories;

import autoFix.dataservice.Entities.RepairCost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RepairCostRepository extends JpaRepository<RepairCost, Integer> {
    @Query(value = "SELECT rc.cost\n" +
            "FROM repair_cost rc\n" +
            "WHERE rc.type_engine = :typeEngine AND\n" +
            "rc.type_repair = :typeRepair", nativeQuery = true)
    Integer getCost(@Param("typeEngine") String typeEngine, @Param("typeRepair") Integer typeRepair);
}
