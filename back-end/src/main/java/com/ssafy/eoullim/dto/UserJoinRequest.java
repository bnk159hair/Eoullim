package com.ssafy.eoullim.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserJoinRequest {
    private String userName;
    private String tel;
    private String userId;
    private String password;
}
