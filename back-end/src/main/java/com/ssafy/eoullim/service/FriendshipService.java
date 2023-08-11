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

    public void regist(Integer myId, Integer friendId) {
        // ERROR : 두 childId가 같은 경우
        if (myId.equals(friendId))
            throw new EoullimApplicationException(ErrorCode.INVALID_DATA, String.format("childIds are same"));
        // ERROR : childId가 없는 경우
        ChildEntity child = childRepository.findById(myId).orElseThrow(
                () -> new EoullimApplicationException(ErrorCode.CHILD_NOT_FOUND));
        ChildEntity friend = childRepository.findById(friendId).orElseThrow(
                () -> new EoullimApplicationException(ErrorCode.CHILD_NOT_FOUND));
        // ERROR : 이미 좋아요 누른 친구인 경우
        friendshipRepository.findByMyIdAndFriendId(myId, friendId)
            .ifPresent(it -> { throw new EoullimApplicationException(ErrorCode.INVALID_DATA); });
        friendshipRepository.save(FriendshipEntity.of(child, friend));
    }

    public List<Child> friendList(Integer myId) {
        return friendshipRepository.findFriendsByMyId(myId)
                .stream()
                .map(Child::fromEntity)
                .collect(Collectors.toList());
    }
}
