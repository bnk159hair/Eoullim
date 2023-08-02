package com.ssafy.eoullim.repository;

import com.ssafy.eoullim.model.Child;
import com.ssafy.eoullim.model.entity.ChildEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChildRepository  extends JpaRepository<ChildEntity, Integer> {
    List<ChildEntity> findAllByUserId(Integer userId);
    
    // 사용 가능
//    Optional<ChildEntity> findByNameAndUser_Id(String name, Integer user_id); // User가 동일한 Child 이름을 가지고 있는지
//    int deleteByIdAndUser_UserName(Integer childId, String userName);         // User가 가진 Child를 삭제
}
