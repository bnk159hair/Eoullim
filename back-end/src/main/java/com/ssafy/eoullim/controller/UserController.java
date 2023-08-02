package com.ssafy.eoullim.controller;

import com.ssafy.eoullim.dto.request.*;
import com.ssafy.eoullim.dto.response.Response;
import com.ssafy.eoullim.model.User;
import com.ssafy.eoullim.service.UserService;
import com.ssafy.eoullim.utils.ClassUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@CrossOrigin("*")
public class UserController {

    private final UserService userService;

    @PostMapping("/join")
    private Response<Void> join(@RequestBody UserJoinRequest request) {
        userService.join(request.getUserName(),
                request.getPassword(),
                request.getName(),
                request.getPhoneNumber());
        return Response.success();
    }

    @PostMapping("/login")
    public Response<String> login(@RequestBody UserLoginRequest request) {
        String token = userService.login(request.getUserName(), request.getPassword());
        return Response.success(token);
    }

    @GetMapping("/logout")
    public Response<Void> logout(Authentication authentication) {
        userService.logout(authentication.getName());
        return Response.success();
    }

    @PutMapping
    public Response<Void> modify(@RequestBody UserModifyRequest request, Authentication authentication) {
        User user = ClassUtils.getSafeCastInstance(authentication.getPrincipal(), User.class);
        userService.modify(user, request.getCurPassword(), request.getNewPassword());
        return Response.success();
    }
    
    @PostMapping("/id-check")    // ID 중복 체크
    public Response<Void> checkId(@RequestBody UserIdCheckRequest request) {
        userService.checkId(request.getUserName());
        return Response.success();
    }
    
    @PostMapping("/pw-check")    // User Password 재확인
    public Response<Void> checkPw(@RequestBody UserPwCheckRequest request, Authentication authentication) {
        User user = ClassUtils.getSafeCastInstance(authentication.getPrincipal(), User.class);
        userService.checkPw(request.getPassword(), user.getPassword());
        return Response.success();
    }
}
