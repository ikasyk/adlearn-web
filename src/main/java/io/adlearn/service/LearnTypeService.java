package io.adlearn.service;

import io.adlearn.entity.LearnType;
import io.adlearn.repository.LearnTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class LearnTypeService {
    private static String[] types = new String[] {
            "dictionary",
            "text"
    };

    private Map<String, LearnType> typesToObj = new HashMap<>();

    private LearnTypeRepository repo;

    @Autowired
    public LearnTypeService(LearnTypeRepository repo) {
        this.repo = repo;

        List<LearnType> learnTypes = new ArrayList<>();
        for (String t : types) {
            LearnType learnType = new LearnType();
            learnType.setPackageName(t);

            learnTypes.add(learnType);

            typesToObj.put(t, learnType);
        }

        repo.save(learnTypes);
    }


    public LearnType findByType(String type) {
        return repo.findByPackageName(type).iterator().next();
//        return typesToObj.get(type);
    }
}
