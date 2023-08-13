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

    public SseEmitter save(Integer childId, SseEmitter emitter) {
        final String key = getKey(childId);
        log.info("emitter 생성 key: " + key);
        emitterMap.put(key, emitter);
        return emitter;
    }

    public void delete(Integer childId) {
        log.info("delete call");
        log.info(childId + "여기서 에러 발생");
        emitterMap.remove(getKey(childId));
    }
    public Optional<SseEmitter> get(Integer childId) {
        final String key = getKey(childId);
        log.info("emitter가져오기 호출");
        log.info("key: " + key);
        SseEmitter result = emitterMap.get(key);
        return Optional.ofNullable(result);
    }

    private String getKey(Integer childId) {
        return "childId:" + childId;
    }

}
