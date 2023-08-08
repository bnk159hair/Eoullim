package com.ssafy.eoullim.repository;

import com.ssafy.eoullim.model.entity.AnimonEntity;
import com.ssafy.eoullim.model.entity.ChildAnimonEntity;
import com.ssafy.eoullim.model.entity.ChildEntity;
import com.ssafy.eoullim.model.entity.FriendshipEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Repository
public interface ChildAnimonRepository extends JpaRepository<ChildAnimonEntity, Integer> {

    Optional<ChildAnimonEntity> findByChildIdAndAnimonId(Integer childId, Integer animonId);
    @Query(value = "select T.animon from ChildAnimonEntity T where T.child.id = :childId")
    List<AnimonEntity> findAnimonsByChildId(Integer childId);
}
