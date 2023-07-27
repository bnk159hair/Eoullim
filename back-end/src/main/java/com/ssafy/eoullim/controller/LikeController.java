package com.ssafy.eoullim.controller;

import com.ssafy.eoullim.dto.request.LikeRequest;
import com.ssafy.eoullim.dto.response.Response;
import com.ssafy.eoullim.service.LikeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/v1/likes")
@RequiredArgsConstructor
public class LikeController {
    private final LikeService likeService;

    @PutMapping
    public Response<?> like(@RequestBody LikeRequest request) {
        likeService.like(request.getFollowingId(), request.getFollowerId());
        return Response.success();
    }

}
