package autoFix.dataservice.Repositories;

import autoFix.dataservice.Entities.FeeMileage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FeeMileageRepository extends JpaRepository<FeeMileage, Integer> {
    @Query(value = "SELECT fm.fee\n" +
            "FROM fee_mileage fm\n" +
            "WHERE fm.type_car = :type\n" +
            "AND fm.min_mileage <= :mileage\n" +
            "AND fm.max_mileage >= :mileage", nativeQuery = true)
    float getFee(@Param("type") String type, @Param("mileage") Integer mileage);
}
