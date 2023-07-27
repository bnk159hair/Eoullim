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

@Service
@RequiredArgsConstructor
public class LikeService {
    private final LikeRepository likeRepository;
    private final ChildRepository childRepository;

    public void like(Integer following, Integer follower) {
        // UserId와 일치하는 사용자 가져오기
//        User user = User.fromEntity(userRepository.findById(userId).orElseThrow(
//                ()-> {   // ERROR : UserID에 일치하는 사용자 X
//                    throw new EoullimApplicationException(ErrorCode.USER_NOT_FOUND, String.format("userId is %s", userId));
//                }));
        // TODO : ID로 Child 객체 받아와서 저장하기
//        likeRepository.save(LikeEntity.of(childRepository.findById(following), childRepository.findById(follower)));
    }
}
