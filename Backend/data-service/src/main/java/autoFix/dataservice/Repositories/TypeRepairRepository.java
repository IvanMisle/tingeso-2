package autoFix.dataservice.Repositories;

import autoFix.dataservice.Entities.TypeRepair;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TypeRepairRepository extends JpaRepository<TypeRepair, Integer> {
    @Query(value = "SELECT tr.name " +
            "FROM type_repair tr " +
            "WHERE tr.number = :number", nativeQuery = true)
    String findNameByNumber(@Param("number") Integer number);

    @Query(value = "SELECT tr.number\n" +
            "FROM type_repair tr\n" +
            "WHERE tr.name = :name", nativeQuery = true)
    Integer findNumberByName(@Param("name") String name);
}
