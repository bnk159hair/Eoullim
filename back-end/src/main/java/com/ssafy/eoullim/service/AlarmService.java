package com.ssafy.eoullim.service;

import com.ssafy.eoullim.exception.EoullimApplicationException;
import com.ssafy.eoullim.exception.ErrorCode;
import com.ssafy.eoullim.model.Alarm;
import com.ssafy.eoullim.repository.EmitterRepository;
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
    private static final Long DEFAULT_TIMEOUT = 60L * 1000 * 60;

    public void send(Integer receiverId, Alarm alarm) {
        emitterRepository.get(receiverId).ifPresentOrElse(it -> {
                    try {
                        it.send(SseEmitter.event()
                                .name("sse")
                                .data(alarm));
                        log.info("성공적으로 보냈어요");
                    } catch (IOException exception) {
                        log.info("delete를 하려고 할 때 발생한 에러");
                        emitterRepository.delete(receiverId);
                        throw new EoullimApplicationException(ErrorCode.NOTIFICATION_CONNECT_ERROR,
                                String.format("%d 에게 초대장 전송을 실패했어요.", receiverId));
                    }
                },
                () -> log.info("No emitter found")
        );
    }

    public SseEmitter subscribe(Integer childId) {
        SseEmitter emitter = new SseEmitter(DEFAULT_TIMEOUT);
        emitterRepository.save(childId, emitter);
        emitter.onCompletion(() -> emitterRepository.delete(childId));
        emitter.onTimeout(() -> emitterRepository.delete(childId));
        try {
            log.info("connect: " + childId);
            emitter.send(SseEmitter.event()
                    .id("id")
                    .name("sse")
                    .data("connect completed"));
        } catch (IOException exception) {
            throw new EoullimApplicationException(ErrorCode.NOTIFICATION_CONNECT_ERROR,
                    String.format("%d 가 초대 구독을 실패 했어요.", childId));
        }
        return emitter;
    }

}
