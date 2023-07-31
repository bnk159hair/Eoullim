package com.ssafy.backendopenvidu.model.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Room {
    private String sessionId;
    private String recordingId;
}
