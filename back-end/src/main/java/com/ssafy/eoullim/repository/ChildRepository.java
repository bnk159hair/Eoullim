package com.ssafy.eoullim.repository;

import com.ssafy.eoullim.model.entity.ChildEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChildRepository  extends JpaRepository<ChildEntity, Integer> {
    List<ChildEntity> findAllByUserId(Integer userId);
}
