package com.ssafy.eoullim.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MatchFrinedRequest {
    Integer childId;
    String name;  
    String sessionId;
    Integer friendId;

}
