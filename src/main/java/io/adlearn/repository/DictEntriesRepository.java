package io.adlearn.repository;

import io.adlearn.entity.LearnDataDictEntry;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DictEntriesRepository extends CrudRepository<LearnDataDictEntry, Long> {
}
