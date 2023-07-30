package com.ssafy.eoullim.controller;

import com.ssafy.eoullim.dto.request.FriendshipRequest;
import com.ssafy.eoullim.dto.response.Response;
import com.ssafy.eoullim.model.Child;
import com.ssafy.eoullim.service.FriendshipService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/friendship")
@RequiredArgsConstructor
public class FriendshipController {
    private final FriendshipService friendshipService;

    @PostMapping
    public Response<Void> regist(@RequestBody FriendshipRequest request) {
        friendshipService.regist(request.getChildId(), request.getFriendId());
        return Response.success();
    }

    @GetMapping("/{childId}")
    public Response<List<Child>> friendList(@PathVariable Integer childId) {
        List<Child> childList = friendshipService.friendList(childId);
        return Response.success(childList);
    }

}
