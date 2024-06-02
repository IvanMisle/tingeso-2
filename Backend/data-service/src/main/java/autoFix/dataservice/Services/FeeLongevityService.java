package autoFix.dataservice.Services;

import autoFix.dataservice.Repositories.FeeLongevityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class FeeLongevityService {
    @Autowired
    private FeeLongevityRepository feeLongevityRepository;

    public Float getFee(Integer manufactureYear, String typeCar) {
        return feeLongevityRepository.getFee(
                (LocalDate.now().getYear() - manufactureYear), typeCar);
    }
}
