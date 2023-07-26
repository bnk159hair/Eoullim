package com.ssafy.eoullim.controller;

import com.ssafy.eoullim.dto.response.Response;
import com.ssafy.eoullim.dto.request.UserJoinRequest;
import com.ssafy.eoullim.dto.request.UserLoginRequest;
import com.ssafy.eoullim.dto.response.UserLoginResponse;
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

    @PostMapping("/join")
    private Response<Void> join(@RequestBody UserJoinRequest request) {
        userService.join(request);
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
