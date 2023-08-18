package com.ssafy.eoullim.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class Room {
    private String sessionId;
    private String recordingId;
    private Integer childOne;
    private Integer childTwo;
    private List<Integer> random;
    private String guideSeq;
    private String timeline;
}
