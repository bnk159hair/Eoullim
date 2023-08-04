package com.ssafy.eoullim.controller;

import com.ssafy.eoullim.model.AnimonOnOff;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // 허용할 도메인을 여기에 입력
public class AnimonController {
    @MessageMapping("/animon") // 클라이언트에서 /pub/animon으로 메시지를 보내면 이 핸들러가 처리합니다.
    @SendTo("/animon/onoff") // 해당 핸들러의 응답을 클라이언트의 /animon/onoff 주제로 전달합니다.
    public AnimonOnOff handleAnimonOnOff(AnimonOnOff data) {
        // 클라이언트로부터 받은 메시지를 모든 클라이언트에게 전달합니다.
        return data;
    }
}
