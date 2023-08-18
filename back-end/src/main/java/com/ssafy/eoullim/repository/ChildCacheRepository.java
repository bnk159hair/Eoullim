package com.ssafy.eoullim.repository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.ObjectUtils;

import java.time.Duration;

@Slf4j
@Repository
@RequiredArgsConstructor
public class ChildCacheRepository {
    private final RedisTemplate<String, Object> childRedisTemplate;

    private final static Duration CHILD_CACHE_TTL = Duration.ofMinutes(5);

    public void setStatus(Integer childId) {
        String key = getKey(childId);
        log.info("Set Child to Redis {}({})", key, "ON");
        childRedisTemplate.opsForValue().set(key, "ON", CHILD_CACHE_TTL);
    }

    public boolean isON(Integer childId) {
        String status = (String) childRedisTemplate.opsForValue().get(getKey(childId));
        if (ObjectUtils.isEmpty(status)) {
            return false;
        }
        log.info("Get Child from Redis {}", status);
        return true;
    }

    public void delete(Integer childId) {
        String key = getKey(childId);
        childRedisTemplate.delete(key);
    }

    private String getKey(Integer childId) {
        return "ChildCache:" + childId;
    }

}
