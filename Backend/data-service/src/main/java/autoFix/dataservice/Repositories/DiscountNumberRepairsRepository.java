package autoFix.dataservice.Repositories;

import autoFix.dataservice.Entities.DiscountNumberRepairs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DiscountNumberRepairsRepository extends JpaRepository<DiscountNumberRepairs, Integer> {
    @Query(value = "SELECT dnr.discount\n" +
            "FROM discount_number_repairs dnr\n" +
            "WHERE dnr.type_engine = :typeEngine AND\n" +
            "dnr.max_number_repairs >= :numberRepairs AND\n" +
            "dnr.min_number_repairs <= :numberRepairs", nativeQuery = true)
    float getDiscount(@Param("typeEngine") String typeEngine, @Param("numberRepairs") Integer numberRepairs);
}
