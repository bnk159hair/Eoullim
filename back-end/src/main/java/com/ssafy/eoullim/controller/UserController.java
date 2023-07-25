package com.ssafy.eoullim.controller;

import com.ssafy.eoullim.dto.Response;
import com.ssafy.eoullim.dto.UserJoinRequest;
import com.ssafy.eoullim.dto.UserLoginRequest;
import com.ssafy.eoullim.dto.UserLoginResponse;
import com.ssafy.eoullim.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    
    // 연석
    @PostMapping("/join")
    private Response<Void> join(@RequestBody UserJoinRequest request) {
        userService.join(request.getUserName(), request.getPassword(), request.getName(), request.getPhoneNumber());
        return Response.success();
    }


    @PostMapping("/login")
    public Response<UserLoginResponse> login(@RequestBody UserLoginRequest request) {
        String token = userService.login(request.getUserName(), request.getPassword());
        return Response.success(new UserLoginResponse(token));
    }

    @GetMapping("/info")
    public Response<?> info(){
        return Response.success();
    }
}
