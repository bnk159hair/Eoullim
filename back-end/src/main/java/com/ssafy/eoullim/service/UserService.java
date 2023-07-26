package com.ssafy.eoullim.service;

import com.ssafy.eoullim.dto.request.UserJoinRequest;
import com.ssafy.eoullim.exception.EoullimApplicationException;
import com.ssafy.eoullim.exception.ErrorCode;
import com.ssafy.eoullim.model.User;
import com.ssafy.eoullim.model.entity.UserEntity;
import com.ssafy.eoullim.repository.UserRepository;
import com.ssafy.eoullim.utils.JwtTokenUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;

    @Value("${jwt.secret-key}")
    private String secretKey;

    @Value("${jwt.token.expired-time-ms}")
    private Long expiredTimeMs;

    public User loadUserByUsername(String userName) throws UsernameNotFoundException {
        return userRepository.findByUserName(userName).map(User::fromEntity).orElseThrow(
                        () -> new EoullimApplicationException(ErrorCode.USER_NOT_FOUND, String.format("userName is %s", userName))
                );
    }

    public String login(String userName, String password) {
        User savedUser = loadUserByUsername(userName);
        if (!encoder.matches(password, savedUser.getPassword())) {
            throw new EoullimApplicationException(ErrorCode.INVALID_PASSWORD);
        }
        return JwtTokenUtils.generateAccessToken(userName, secretKey, expiredTimeMs);
    }

    @Transactional
    public void join(String userName, String password, String name, String phoneNumber) {
        idCheck(userName);  // 아이디 중복 체크

        // 비밀번호 암호화해서 DB에 저장
        userRepository.save(UserEntity.of(name, phoneNumber, userName, encoder.encode(password)));
        return;
    }
    // ID 중복 체크
    public void idCheck(String userName) {
        // ERROR : Duplicated ID
        userRepository.findByUserName(userName).ifPresent(it -> {
            throw new EoullimApplicationException(ErrorCode.DUPLICATED_USER_NAME, String.format("userName is %s", userName));
        });
        return;
    }

    public void pwCheck(String pwRequest, String pwCorrect) {
        if (!encoder.matches(pwRequest, pwCorrect)) {
            throw new EoullimApplicationException(ErrorCode.INVALID_PASSWORD, String.format("userName is %s", pwRequest));
        }
        return;
    }

}
