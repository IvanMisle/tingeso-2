package autoFix.dataservice.Repositories;

import autoFix.dataservice.Entities.FeeLongevity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FeeLongevityRepository extends JpaRepository<FeeLongevity, Integer> {
    @Query(value = "SELECT fl.fee\n" +
            "from fee_longevity fl\n" +
            "WHERE fl.min_year <= :year\n" +
            "AND fl.max_year >= :year\n" +
            "AND fl.type_car = :type", nativeQuery = true)
    float getFee(@Param("year") Integer year, @Param("type") String type);
}
