package com.ssafy.eoullim.controller;

import com.ssafy.eoullim.dto.Response;
import com.ssafy.eoullim.dto.UserJoinRequest;
import com.ssafy.eoullim.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    
    // 연석
    @GetMapping("/users/join")
    private Response<Void> join(@RequestBody UserJoinRequest request) {

        userService.join(request);
        return Response.success();

    }

}
