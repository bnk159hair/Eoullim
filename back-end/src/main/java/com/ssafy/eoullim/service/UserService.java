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

    public void join(UserJoinRequest request) {
        // Check Duplicated UserName
        userRepository.findByUserName(request.getUserName()).ifPresent(it -> {
            throw new EoullimApplicationException(ErrorCode.DUPLICATED_USER_NAME, String.format("userName is %s", request.getUserName()));
        });

        userRepository.save(UserEntity.of(request));
    }

}
