package io.adlearn.repository;

import io.adlearn.entity.LearnDataDict;
import io.adlearn.entity.LearnDictResult;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DictResultsRepository extends CrudRepository<LearnDictResult, Long> {
}
