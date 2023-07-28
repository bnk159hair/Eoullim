package com.ssafy.eoullim.repository;

import com.ssafy.eoullim.model.entity.ChildEntity;
import com.ssafy.eoullim.model.entity.LikeEntity;
import com.ssafy.eoullim.model.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<LikeEntity, Integer> {
    Optional<LikeEntity> findByFollowingIdAndFollowerId(Integer followingId, Integer followerId);   // userID를 이용한 select
    @Query(value = "select l.follower from LikeEntity l where l.following.id = :myId")
    List<ChildEntity> findFollowings(@Param("myId") Integer myId);

//    List<ChildEntity> findFollByChildEntities(Integer myId);

    //select c from ChildEntity c where c.child_id = (select l.follower_id from LikeEntity l where l.following_id = :myId)
}
