package com.ssafy.eoullim.repository;

import com.ssafy.eoullim.model.entity.AnimonEntity;
import com.ssafy.eoullim.model.entity.ChildAnimonEntity;
import com.ssafy.eoullim.model.entity.ChildEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;

@Repository
public interface ChildAnimonRepository extends JpaRepository<ChildAnimonEntity, Integer> {
    @Query(value = "select T.animon from ChildAnimonEntity T where T.child.id = :childId")
    List<AnimonEntity> findAnimonsByChildId(Integer childId);
}
