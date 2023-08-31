package com.ssafy.eoullim.service;

import com.ssafy.eoullim.exception.EoullimApplicationException;
import com.ssafy.eoullim.exception.ErrorCode;
import com.ssafy.eoullim.model.Child;
import com.ssafy.eoullim.model.Status;
import com.ssafy.eoullim.model.entity.ChildEntity;
import com.ssafy.eoullim.model.entity.FriendshipEntity;
import com.ssafy.eoullim.repository.ChildCacheRepository;
import com.ssafy.eoullim.repository.ChildRepository;
import com.ssafy.eoullim.repository.FriendshipRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FriendshipService {

    private final FriendshipRepository friendshipRepository;
    private final ChildRepository childRepository;
    private final ChildCacheRepository childCacheRepository;

    public void regist(Integer childId, Integer friendId) {

        if (childId.equals(friendId)) // childId와 friendId가 같은 경우
            throw new EoullimApplicationException(ErrorCode.INVALID_DATA, String.format("childIds are same"));

        ChildEntity child = childRepository.findById(childId).orElseThrow(
                () -> new EoullimApplicationException(ErrorCode.CHILD_NOT_FOUND));
        ChildEntity friend = childRepository.findById(friendId).orElseThrow(
                () -> new EoullimApplicationException(ErrorCode.CHILD_NOT_FOUND));

        friendshipRepository.findByChildAndFriend(child, friend) // 이미 좋아요 누른 친구인 경우
            .ifPresent(it -> { throw new EoullimApplicationException(ErrorCode.INVALID_DATA); });

        friendshipRepository.save(FriendshipEntity.of(child, friend));
    }

    public List<Child> getFriends(Integer childId, Integer userId) {

        ChildEntity childEntity = childRepository.findById(childId).orElseThrow(
                () -> new EoullimApplicationException(ErrorCode.CHILD_NOT_FOUND,
                        String.format("child %d is not found", childId)));

        if(!childEntity.getUser().getId().equals(userId)) // user가 해당 child에 권한이 없는 경우
            throw new EoullimApplicationException(ErrorCode.FORBIDDEN_NO_PERMISSION,
                    String.format("you have no permission with child %d", childId));

        List<Child> friends = friendshipRepository.findFriendsByChild(childEntity)
                                .stream()
                                .map(Child::fromEntity)
                                .collect(Collectors.toList());
        for (Child friend : friends) {
            if (childCacheRepository.isON(friend.getId()))
                friend.setStatus(Status.ON);
            else friend.setStatus(Status.OFF);
        }
        return friends;
    }
}
