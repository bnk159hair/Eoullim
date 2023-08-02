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

    public void regist(Integer childId, Integer friendId) {
        // TODO : OR 연산으로 가져와서 2이면 정상 진행
//        List<ChildEntity> childList = childRepository.findChildren(childId, friendId);
//        if (childList.size() == 2) {
//
//        } else {
//            throw new EoullimApplicationException(ErrorCode.CHILD_NOT_FOUND);
//        }

        // 2가 아니면 에러
        // ERROR : childId가 없는 경우
        ChildEntity child = childRepository.findById(childId).orElseThrow(() ->
                new EoullimApplicationException(ErrorCode.CHILD_NOT_FOUND));
        ChildEntity friend = childRepository.findById(friendId).orElseThrow(() ->
                new EoullimApplicationException(ErrorCode.CHILD_NOT_FOUND));

        // ERROR : 두 childId가 같은 경우
        if (childId.equals(friendId))
            throw new EoullimApplicationException(ErrorCode.INVALID_DATA, String.format("childIds are same"));

        // ERROR : 이미 좋아요 누른 친구인 경우
        friendshipRepository.findByChildIdAndFriendId(childId, friendId).ifPresent(it -> {
                throw new EoullimApplicationException(ErrorCode.LIKE_ALREADY_FOUND);
            }
        );
        friendshipRepository.save(FriendshipEntity.of(child, friend));
    }

    public List<Child> friendList(Integer childId) {
        return friendshipRepository.findFriendsByChildId(childId)
                .stream()
                .map(Child::fromEntity)
                .collect(Collectors.toList());
    }
}
