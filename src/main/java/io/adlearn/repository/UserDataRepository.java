package io.adlearn.repository;

import io.adlearn.entity.LearnData;
import io.adlearn.entity.UserLearnData;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface UserDataRepository extends JpaRepository<UserLearnData, Long> {
//    @Query("select du from UserLearnData where du.user_id = ?1 and du.data_id = ?2")
    UserLearnData findByUserIdAndDataId(Long userId, Long dataId);
}
