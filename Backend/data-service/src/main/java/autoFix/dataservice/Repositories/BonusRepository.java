package autoFix.dataservice.Repositories;

import autoFix.dataservice.Entities.Bonus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface BonusRepository extends JpaRepository<Bonus, Long> {
    @Query(value = "SELECT b.bonus\n" +
            "FROM bonus b\n" +
            "WHERE b.brand = :brand\n" +
            "AND b.amount > 0", nativeQuery = true)
    Integer getBonus(@Param("brand") String brand);

    @Modifying
    @Transactional
    @Query(value = "UPDATE bonus b " +
            "SET b.amount = b.amount + :number " +
            "WHERE b.brand = :brand", nativeQuery = true)
    void changeAmount(@Param("brand") String brand, @Param("number") Integer number);
}
