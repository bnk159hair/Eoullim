package com.ssafy.eoullim.controller;

import com.ssafy.eoullim.dto.request.WSAnimonOnOffRequest;
import com.ssafy.eoullim.dto.request.WSGuideOnOffRequest;
import com.ssafy.eoullim.dto.request.WSLeaveRequest;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WebSocketController {

    @MessageMapping("/{room_id}/animon")        // client가 publish한 Msg Mapping
    @SendTo("/topic/{room_id}/animon")          // server가 subscriber에게 전달
    public WSAnimonOnOffRequest handleAnimonOnOff(@DestinationVariable("room_id") String roomId,
                                         WSAnimonOnOffRequest request) {
        return request;
    }

    @MessageMapping("/{room_id}/guide")
    @SendTo("/topic/{room_id}/guide")
    public WSGuideOnOffRequest handleGuideAgreement(@DestinationVariable("room_id") String roomId,
                                                    WSGuideOnOffRequest request) {
        return request;
    }

    @MessageMapping("/{room_id}/leave-session")
    @SendTo("/topic/{room_id}/leave-session")
    public WSLeaveRequest handleGuideAgreement(@DestinationVariable("room_id") String roomId,
                                               WSLeaveRequest request) {
        return request;
    }

}
