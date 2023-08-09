package com.ssafy.eoullim.model;

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
