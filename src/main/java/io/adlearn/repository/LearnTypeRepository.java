package io.adlearn.repository;

import io.adlearn.entity.LearnType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Collections;

@Repository
public interface LearnTypeRepository extends CrudRepository<LearnType, Long> {
    Collection<LearnType> findByPackageName(String name);
}
