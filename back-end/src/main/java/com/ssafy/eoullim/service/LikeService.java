package com.ssafy.eoullim.service;

import com.ssafy.eoullim.exception.EoullimApplicationException;
import com.ssafy.eoullim.exception.ErrorCode;
import com.ssafy.eoullim.model.Child;
import com.ssafy.eoullim.model.User;
import com.ssafy.eoullim.model.entity.ChildEntity;
import com.ssafy.eoullim.model.entity.LikeEntity;
import com.ssafy.eoullim.repository.ChildRepository;
import com.ssafy.eoullim.repository.LikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LikeService {
    private final LikeRepository likeRepository;
    private final ChildRepository childRepository;

    @Transactional
    public void like(Integer following, Integer follower) {
        // ERROR : childId가 없는 경우
        ChildEntity followingEntity = childRepository.findById(following).orElseThrow(() ->
                new EoullimApplicationException(ErrorCode.CHILD_NOT_FOUND, String.format("%d is not childId", following)));
        ChildEntity followerEntity = childRepository.findById(follower).orElseThrow(() ->
                new EoullimApplicationException(ErrorCode.CHILD_NOT_FOUND, String.format("%d is not childId", follower)));
        // ERROR : childId가 같은 경우
        if (following.equals(follower)) throw new EoullimApplicationException(ErrorCode.INVALID_DATA, String.format("these childId is Same %d", following));
        // ERROR : 이미 좋아요 누른 친구인 경우
        likeRepository.findByFollowingIdAndFollowerId(following, follower).ifPresent( it -> {
            throw new EoullimApplicationException(ErrorCode.LIKE_ALREADY_FOUND, String.format(following+" Already likes %d", follower));
        }
        );
        // TODO : ID로 Child 객체 받아와서 저장하기
        likeRepository.save(LikeEntity.of(followingEntity, followerEntity));
    }

    public List<Child> likeList(Integer childId) {
        childRepository.findById(childId).orElseThrow(() ->
                new EoullimApplicationException(ErrorCode.CHILD_NOT_FOUND, String.format("%d is not childId", childId)));
        // child ID로 followerId 다 가져오기
        // 그 아이디로 모든 child 가져오기
        return likeRepository.findFollowings(childId).stream().map(Child::fromEntity).collect(Collectors.toList());
    }
}
