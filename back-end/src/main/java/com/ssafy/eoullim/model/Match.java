package com.ssafy.eoullim.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor

public class Match {

    private String sessionId;
    private String token;
    private List<Integer> guideSeq;
}
