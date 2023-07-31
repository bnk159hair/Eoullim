package com.ssafy.eoullim.controller;

import com.ssafy.eoullim.dto.response.Response;
import com.ssafy.eoullim.model.Animon;
import com.ssafy.eoullim.model.Child;
import com.ssafy.eoullim.model.User;
import com.ssafy.eoullim.model.entity.AnimonEntity;
import com.ssafy.eoullim.service.AnimonService;
import com.ssafy.eoullim.service.ChildService;
import com.ssafy.eoullim.utils.ClassUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/animons")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AnimonController {

    private final AnimonService animonService;

    @GetMapping("/{childId}")
    public Response<List<Animon>> list(@PathVariable Integer childId) {
        List<Animon> animonList = animonService.list(childId);
        return Response.success(animonList);
    }
}
