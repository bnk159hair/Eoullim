package com.ssafy.eoullim.service;

import com.ssafy.eoullim.exception.EoullimApplicationException;
import com.ssafy.eoullim.exception.ErrorCode;
import com.ssafy.eoullim.model.User;
import com.ssafy.eoullim.model.entity.UserEntity;
import com.ssafy.eoullim.repository.UserCacheRepository;
import com.ssafy.eoullim.repository.UserRepository;
import com.ssafy.eoullim.utils.JwtTokenUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserCache;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;
    private final UserCacheRepository userCacheRepository;
    private final RedisTemplate<String, Object> blackListTemplate;

    @Value("${jwt.secret-key}")
    private String secretKey;

    @Value("${jwt.token.expired-time-ms}")
    private Long expiredTimeMs;

    public User loadUserByUsername(String userName) throws UsernameNotFoundException {
        return userCacheRepository.getUser(userName).orElseGet(
                () -> userRepository.findByUserName(userName).map(User::fromEntity).orElseThrow(
                        () -> new EoullimApplicationException(ErrorCode.USER_NOT_FOUND)));
    }

    public void join(String userName, String password, String name, String phoneNumber) {
        userRepository.findByUserName(userName).ifPresent(it -> {
            throw new EoullimApplicationException(ErrorCode.DUPLICATED_NAME);
        });
        userRepository.save(UserEntity.of(name, phoneNumber, userName, encoder.encode(password)));
    }

    public String login(String userName, String password) {
        User savedUser = loadUserByUsername(userName);

        String key = setBlackListKey(userName); // BlackList Key
        blackListTemplate.delete(key); // BlackList에서 삭제
        userCacheRepository.setUser(savedUser); // UserCache에 저장
        if (!encoder.matches(password, savedUser.getPassword())) {
            throw new EoullimApplicationException(ErrorCode.FORBIDDEN_INVALID_PASSWORD);
        }
        return JwtTokenUtils.generateAccessToken(userName, secretKey, expiredTimeMs);
    }

    public void logout(String userName) {
        String key = setBlackListKey(userName);
        userCacheRepository.delete(userName); // UserCache에서 삭제
        blackListTemplate.opsForValue().set(key,"logout", expiredTimeMs, TimeUnit.MILLISECONDS);
    }

    public String setBlackListKey(String userName) {
        return "BlackList:" + userName;
    }

    @Transactional
    public void modify(User user, String curPassword, String newPassword) {
        if (!encoder.matches(curPassword, user.getPassword())) {
            throw new EoullimApplicationException(ErrorCode.FORBIDDEN_INVALID_PASSWORD);
        }
        user.setPassword(encoder.encode(newPassword));
        userRepository.save(UserEntity.of(user));
    }

    public void checkId(String userName) {
        userRepository.findByUserName(userName).ifPresent(it -> {
            throw new EoullimApplicationException(ErrorCode.DUPLICATED_NAME);
        });
    }

    public void checkPw(String pwRequest, String pwCorrect) {
        if (!encoder.matches(pwRequest, pwCorrect)) {
            throw new EoullimApplicationException(ErrorCode.FORBIDDEN_INVALID_PASSWORD);
        }
    }

}
