package autoFix.dataservice.Services;

import autoFix.dataservice.Entities.Bonus;
import autoFix.dataservice.Repositories.BonusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BonusService {
    @Autowired
    private BonusRepository bonusRepository;

    public Integer getBonus(String brand) {
        return bonusRepository.getBonus(brand);
    }

    public boolean changeAmount(String brand, Integer number) throws Exception{
        try {
            bonusRepository.changeAmount(brand, number);
            return true;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}
