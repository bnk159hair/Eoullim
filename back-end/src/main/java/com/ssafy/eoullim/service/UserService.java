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
    private final RedisTemplate<String, Object> blackList;

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
            throw new EoullimApplicationException(ErrorCode.DUPLICATED_USER_NAME);
        });
        userRepository.save(UserEntity.of(name, phoneNumber, userName, encoder.encode(password)));
    }

    public String login(String userName, String password) {
        User savedUser = loadUserByUsername(userName);
        userCacheRepository.setUser(savedUser);
        if (!encoder.matches(password, savedUser.getPassword())) {
            throw new EoullimApplicationException(ErrorCode.INVALID_PASSWORD);
        }
        return JwtTokenUtils.generateAccessToken(userName, secretKey, expiredTimeMs);
    }

    public void logout(String userName){
        blackList.opsForValue().set(userName,"logout", expiredTimeMs, TimeUnit.MILLISECONDS);
    }

    @Transactional
    public void modify(User user, String curPassword, String newPassword) {
        if (!encoder.matches(curPassword, user.getPassword())) {
            throw new EoullimApplicationException(ErrorCode.INVALID_PASSWORD);
        }
        user.setPassword(encoder.encode(newPassword));
        userRepository.save(UserEntity.of(user));
    }

    public void checkId(String userName) {
        userRepository.findByUserName(userName).ifPresent(it -> {
            throw new EoullimApplicationException(ErrorCode.DUPLICATED_USER_NAME);
        });
    }

    public void checkPw(String pwRequest, String pwCorrect) {
        if (!encoder.matches(pwRequest, pwCorrect)) {
            throw new EoullimApplicationException(ErrorCode.INVALID_PASSWORD);
        }
    }

}
