package com.ssafy.eoullim.service;

import com.ssafy.eoullim.exception.EoullimApplicationException;
import com.ssafy.eoullim.exception.ErrorCode;
import com.ssafy.eoullim.model.Alarm;
import com.ssafy.eoullim.model.entity.UserEntity;
import com.ssafy.eoullim.repository.EmitterRepository;
import com.ssafy.eoullim.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;

@Slf4j
@Service
@RequiredArgsConstructor
public class AlarmService {

    private final static String ALARM_NAME = "alarm";
    private final EmitterRepository emitterRepository;
    private final UserRepository userRepository;
    private static final Long DEFAULT_TIMEOUT = 60L * 1000 * 60;

    public void send(Integer receiverId, Alarm alarm) {
        emitterRepository.get(receiverId).ifPresentOrElse(it -> {
                    try {
                        it.send(SseEmitter.event()
                                .name(ALARM_NAME)
                                .data(alarm));
                    } catch (IOException exception) {
                        emitterRepository.delete(receiverId);
                        throw new EoullimApplicationException(ErrorCode.NOTIFICATION_CONNECT_ERROR);
                    }
                },
                () -> log.info("No emitter found")
        );
    }

    public SseEmitter subscribe(Integer userId) {
        SseEmitter emitter = new SseEmitter(DEFAULT_TIMEOUT);
        emitterRepository.save(userId, emitter);
        emitter.onCompletion(() -> emitterRepository.delete(userId));
        emitter.onTimeout(() -> emitterRepository.delete(userId));
        try {
            log.info("connect");
            emitter.send(SseEmitter.event()
                    .id("id")
                    .name("connect")
                    .data("connect completed"));
        } catch (IOException exception) {
            throw new EoullimApplicationException(ErrorCode.NOTIFICATION_CONNECT_ERROR);
        }
        return emitter;
    }

}