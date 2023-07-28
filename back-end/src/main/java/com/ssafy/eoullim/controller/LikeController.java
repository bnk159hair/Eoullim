package com.ssafy.eoullim.controller;

import com.ssafy.eoullim.dto.request.LikeRequest;
import com.ssafy.eoullim.dto.response.ChildResponse;
import com.ssafy.eoullim.dto.response.Response;
import com.ssafy.eoullim.model.Child;
import com.ssafy.eoullim.service.LikeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api/v1/likes")
@RequiredArgsConstructor
public class LikeController {
    private final LikeService likeService;

    @PostMapping
    public Response<?> like(@RequestBody LikeRequest request) {
        likeService.like(request.getFollowingId(), request.getFollowerId());
        return Response.success();
    }

    @GetMapping(value = "{userId}")
    public Response<List<ChildResponse>> likeList(@PathVariable Integer userId) {
        List<Child> childList = likeService.likeList(userId);
        System.out.println(childList);
        return Response.success(
                childList.stream().map(ChildResponse::fromChild).collect(Collectors.toList())
        );
    }

}
