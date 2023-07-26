package com.ssafy.eoullim.repository;

import com.ssafy.eoullim.model.entity.ChildEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChildRepository  extends JpaRepository<ChildEntity, Integer> {

//    // 자녀 이름 중복 검사
//    @Query(value = "select * from ChildEntity where user_name = :userName and name = :name")
//    Optional<ChildEntity> selectChildByName(@Param(value = "userName") String userName,
//                                            @Param(value = "name") String name);
    @Query(value = "select c from ChildEntity c where c.user.id = (select u.id from UserEntity u where u.userName = :userName)")
    List<ChildEntity> findByUserName(@Param(value = "userName") String userName);
  }
