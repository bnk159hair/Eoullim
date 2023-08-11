package com.ssafy.backendopenvidu.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MatchRequest {
    private Integer childId;
    private String name;
    private char gender;
    private String school;
    private Integer grade;
}
