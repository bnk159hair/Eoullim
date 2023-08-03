package com.ssafy.eoullim.repository;

import com.ssafy.eoullim.model.entity.ChildEntity;
import com.ssafy.eoullim.model.entity.FriendshipEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FriendshipRepository extends JpaRepository<FriendshipEntity, Integer> {
    Optional<FriendshipEntity> findByMyIdAndFriendId(Integer myId, Integer friendId);

    @Query(value = "select l.friend from FriendshipEntity l where l.my.id = :myId")
    List<ChildEntity> findFriendsByMyId(@Param("myId") Integer myId);
}
