package com.ssafy.eoullim.service;

import com.ssafy.eoullim.dto.UserJoinRequest;
import com.ssafy.eoullim.exception.EoullimApplicationException;
import com.ssafy.eoullim.exception.ErrorCode;
import com.ssafy.eoullim.model.User;
import com.ssafy.eoullim.model.entity.UserEntity;
import com.ssafy.eoullim.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;

    @Transactional
    public void join(UserJoinRequest request) {
        String userName = request.getUserName();
        // check the userId not exist
        userRepository.findByUserName(userName).ifPresent(it -> {
            throw new EoullimApplicationException(ErrorCode.DUPLICATED_USER_NAME, String.format("userName is %s", userName));
        });

        userRepository.save(UserEntity.of(userName, encoder.encode(request.getPassword())));
        return;
    }
}
