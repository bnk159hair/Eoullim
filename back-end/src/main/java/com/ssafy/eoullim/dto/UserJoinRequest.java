package com.ssafy.eoullim.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserJoinRequest {
    private String phoneNumber;
    private String name;
    private String userName;
    private String password;
}
