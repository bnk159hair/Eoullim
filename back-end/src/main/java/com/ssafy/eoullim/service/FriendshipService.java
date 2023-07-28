package com.ssafy.eoullim.service;

import com.ssafy.eoullim.exception.EoullimApplicationException;
import com.ssafy.eoullim.exception.ErrorCode;
import com.ssafy.eoullim.model.Child;
import com.ssafy.eoullim.model.entity.ChildEntity;
import com.ssafy.eoullim.model.entity.FriendshipEntity;
import com.ssafy.eoullim.repository.ChildRepository;
import com.ssafy.eoullim.repository.FriendshipRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FriendshipService {
    private final FriendshipRepository friendshipRepository;
    private final ChildRepository childRepository;

    @Transactional
    public void regist(Integer myId, Integer friendId) {
        // ERROR : childId가 없는 경우
        ChildEntity meEntity = childRepository.findById(myId).orElseThrow(() ->
                new EoullimApplicationException(ErrorCode.CHILD_NOT_FOUND, String.format("%d is not childId", myId)));
        ChildEntity friendEntity = childRepository.findById(friendId).orElseThrow(() ->
                new EoullimApplicationException(ErrorCode.CHILD_NOT_FOUND, String.format("%d is not childId", friendId)));
        // ERROR : childId가 같은 경우
        if (myId.equals(friendId)) throw new EoullimApplicationException(ErrorCode.INVALID_DATA, String.format("these childId is Same %d", myId));
        // ERROR : 이미 좋아요 누른 친구인 경우
        friendshipRepository.findByMeIdAndFriendId(myId, friendId).ifPresent(it -> {
            throw new EoullimApplicationException(ErrorCode.LIKE_ALREADY_FOUND, String.format(myId+" Already likes %d", friendId));
        }
        );
        // TODO : ID로 Child 객체 받아와서 저장하기
        friendshipRepository.save(FriendshipEntity.of(meEntity, friendEntity));
    }

    public List<Child> friendList(Integer myId) {
        // child ID로 followerId 다 가져오기
        // 그 아이디로 모든 child 가져오기
        return friendshipRepository.findFriends(myId).stream().map(Child::fromEntity).collect(Collectors.toList());
    }
}
