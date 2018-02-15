package io.adlearn.service;

import io.adlearn.entity.LearnData;
import io.adlearn.entity.LearnDataDictEntry;
import io.adlearn.entity.LearnDictResult;
import io.adlearn.entity.UserLearnData;
import io.adlearn.repository.DataRepository;
import io.adlearn.repository.DictEntriesRepository;
import io.adlearn.repository.DictResultsRepository;
import io.adlearn.repository.UserDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DataService {
    private UserDataRepository repo;

    private DataRepository dataRepository;

    private DictResultsRepository dictResultsRepository;
    private DictEntriesRepository dictEntriesRepository;

    @Autowired
    public DataService(UserDataRepository repo, DataRepository dataRepository, DictResultsRepository dictResultsRepository, DictEntriesRepository dictEntriesRepository) {
        this.repo = repo;
        this.dataRepository = dataRepository;
        this.dictResultsRepository = dictResultsRepository;
        this.dictEntriesRepository = dictEntriesRepository;
    }

    public void create(UserLearnData data) {
        repo.save(data);
    }

    public Collection<UserLearnData> getAll() {
        return repo.findAll();
    }

    public UserLearnData findById(Long id) {
        return repo.getOne(id);
    }

    @Deprecated
    public LearnData findDataById(Long id) {
        return dataRepository.getOne(id);
    }

    public UserLearnData findByUserIdAndDataId(Long userId, Long dataId) {
        return repo.findByUserIdAndDataId(userId, dataId);
    }

    public void saveResults(LearnDictResult result) {
        dictResultsRepository.save(result);
    }

    public Map<Long, LearnDataDictEntry> findEntriesByIds(Iterable<Long> ids) {
        Map<Long, LearnDataDictEntry> foundEntries = new HashMap<>();
        Iterable<LearnDataDictEntry> results = dictEntriesRepository.findAll(ids);

        results.forEach(entry -> foundEntries.put(entry.getId(), entry));

        return foundEntries;
    }


}
