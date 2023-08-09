package com.ssafy.eoullim.repository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Repository
@RequiredArgsConstructor
public class EmitterRepository {

    private final Map<String, SseEmitter> emitterMap = new ConcurrentHashMap<>();

    public SseEmitter save(Integer userId, SseEmitter emitter) {
        final String key = getKey(userId);
        emitterMap.put(key, emitter);
        return emitter;
    }

    public void delete(Integer userId) {
        emitterMap.remove(getKey(userId));
    }

    public Optional<SseEmitter> get(Integer userId) {
        SseEmitter result = emitterMap.get(getKey(userId));
        return Optional.ofNullable(result);
    }

    private String getKey(Integer userId) {
        return "userId:" + userId;
    }

}
