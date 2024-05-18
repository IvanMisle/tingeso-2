package autoFix.dataservice.Repositories;

import autoFix.dataservice.Entities.Bonus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BonusRepository extends JpaRepository<Bonus, Long> {
    @Query(value = "SELECT b.bonus\n" +
            "FROM bonus b\n" +
            "WHERE b.brand = :brand\n" +
            "AND b.amount > 0", nativeQuery = true)
    Integer getBonus(@Param("brand") String brand);
}
