package com.ssafy.eoullim.controller;

import com.ssafy.eoullim.dto.request.ChildRequest;
import com.ssafy.eoullim.dto.response.Response;
import com.ssafy.eoullim.model.Child;
import com.ssafy.eoullim.model.User;
import com.ssafy.eoullim.service.ChildService;
import com.ssafy.eoullim.utils.ClassUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/children")
@RequiredArgsConstructor
public class ChildController {

    private final ChildService childService;

    @GetMapping
    public Response<List<Child>> list(Authentication authentication) {
        System.out.println(authentication.getPrincipal());
        User user = ClassUtils.getSafeCastInstance(authentication.getPrincipal(), User.class);
        List<Child> childList = childService.list(user.getId());
        return Response.success(childList);
    }

    // 자녀 등록
    @PostMapping
    public Response<Void> create(@RequestBody ChildRequest request, Authentication authentication) {
        User user = ClassUtils.getSafeCastInstance(authentication.getPrincipal(), User.class);
        childService.create(
                user,
                request.getName(),
                request.getBirth(),
                request.getGender(),
                request.getSchool(),
                request.getGrade()
        );
        return Response.success();
    }

    // 특정 자녀 선택
    @PostMapping("/login/{childId}")
    public Response<Child> login(@PathVariable Integer childId) {
        Child child = childService.login(childId);
        return Response.success(child);
    }

    // 특정 자녀 정보 상세보기
    @GetMapping("/{childId}")
    public Response<?> info(@PathVariable Integer childId) {
        Child child = childService.info(childId);
        return Response.success(child);
    }

    // 특정 자녀 수정
    @PutMapping("/{childId}")
    public Response<?> modify(@PathVariable Integer childId,
                              @RequestBody ChildRequest request) {
        childService.modify(childId, request);
        return Response.success();
    }

    // 특정 자녀 삭제
    @DeleteMapping("/{childId}")
    public Response<Void> delete(@PathVariable Integer childId, Authentication authentication) {
        childService.delete(childId, authentication.getName());
        return Response.success();
    }

    // 애니몬 조회

    // 영상 조회

}
