package com.ssafy.eoullim.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.eoullim.dto.request.WSAnimonOnOffRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

@Controller
public class WebSocketHandler extends TextWebSocketHandler {

    private static final Set<WebSocketSession> sessions = new HashSet<>();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session);
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        String payload = message.getPayload();
        // JSON 문자열을 객체로 역직렬화
        WSAnimonOnOffRequest animonOnOff = objectMapper.readValue(payload, WSAnimonOnOffRequest.class);

        // 객체를 JSON 문자열로 직렬화
        String serializedMessage = objectMapper.writeValueAsString(animonOnOff);

        // 모든 클라이언트에게 다시 전달
        for (WebSocketSession s : sessions) {
            s.sendMessage(new TextMessage(serializedMessage));
        }
    }
}

