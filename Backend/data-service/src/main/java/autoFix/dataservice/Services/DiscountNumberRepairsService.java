package autoFix.dataservice.Services;

import autoFix.dataservice.Repositories.DiscountNumberRepairsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DiscountNumberRepairsService {
    @Autowired
    private DiscountNumberRepairsRepository discountNumberRepairsRepository;

    public Float getDiscount(String typeEngine, Integer numberRepairs) {
        return discountNumberRepairsRepository.getDiscount(typeEngine, numberRepairs);
    }
}
