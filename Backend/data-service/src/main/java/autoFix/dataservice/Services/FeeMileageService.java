package autoFix.dataservice.Services;

import autoFix.dataservice.Repositories.FeeMileageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FeeMileageService {
    @Autowired
    private FeeMileageRepository feeMileageRepository;

    public Float getFee(String typeCar, Integer mileage) {
        return feeMileageRepository.getFee(typeCar, mileage);
    }
}
