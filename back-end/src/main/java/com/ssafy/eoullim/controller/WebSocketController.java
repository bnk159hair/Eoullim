package com.ssafy.eoullim.controller;

import com.ssafy.eoullim.model.AnimonOnOff;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WebSocketController {

    @MessageMapping("/animon")      // Client에서 /pub/animon으로 보내면 이 핸들러가 처리.
    @SendTo("/sub/animon")          // 응답을 클라이언트의 /sub/animon 주제로 전달합니다.
    public AnimonOnOff handleAnimonOnOff(AnimonOnOff data) {        // Animon Mask On/Off 여부
        return data; // 클라이언트로부터 받은 메시지를 모든 클라이언트에게 전달
    }

    private int agreedUsers = 0;

    @MessageMapping("/guide")
    @SendTo("/sub/guide")
    public String handleGuideAgreement(@Payload Boolean agreed) {
        if (agreed) {
            agreedUsers++;
            if (agreedUsers == 2) {
                // 두 사용자 모두 동의한 경우, 다음 가이드를 재생하는 로직 실행
                // 예: playNextGuide();
                agreedUsers = 0; // 동의 횟수 초기화
                return "다음 가이드 실행";
            }
        } else {
            agreedUsers = 0; // 하나라도 동의하지 않으면 동의 횟수 초기화
        }
        return "실패";
    }

}
