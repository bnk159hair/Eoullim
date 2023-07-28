package com.ssafy.eoullim.controller;

import com.ssafy.eoullim.dto.request.FriendshipRequest;
import com.ssafy.eoullim.dto.response.ChildResponse;
import com.ssafy.eoullim.dto.response.Response;
import com.ssafy.eoullim.model.Child;
import com.ssafy.eoullim.service.FriendshipService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api/v1/friendship")
@RequiredArgsConstructor
public class FriendshipController {
    private final FriendshipService friendshipService;

    @PostMapping
    public Response<?> regist(@RequestBody FriendshipRequest request) {
        friendshipService.regist(request.getMyId(), request.getFriendId());
        return Response.success();
    }

    @GetMapping(value = "{userId}")
    public Response<List<ChildResponse>> friendList(@PathVariable Integer userId) {
        List<Child> childList = friendshipService.friendList(userId);
        System.out.println(childList);
        return Response.success(
                childList.stream().map(ChildResponse::fromChild).collect(Collectors.toList())
        );
    }

}
