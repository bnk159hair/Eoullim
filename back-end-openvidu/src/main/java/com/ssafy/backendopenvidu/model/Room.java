package com.ssafy.backendopenvidu.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Room {
    private String sessionId;
    private String recordingId;
    private Integer childOne;
    private Integer childTwo;
}
