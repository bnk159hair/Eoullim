package com.ssafy.eoullim.controller;

import com.ssafy.eoullim.dto.request.ChildSchoolRequest;
import com.ssafy.eoullim.dto.request.ChildRequest;
import com.ssafy.eoullim.dto.response.Response;
import com.ssafy.eoullim.model.Animon;
import com.ssafy.eoullim.model.Child;
import com.ssafy.eoullim.model.User;
import com.ssafy.eoullim.model.entity.ChildEntity;
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
@CrossOrigin("*")
public class ChildController {

    private final ChildService childService;

    @GetMapping
    public Response<List<Child>> list(Authentication authentication) {
        User user = ClassUtils.getSafeCastInstance(authentication.getPrincipal(), User.class);
        List<Child> childList = childService.getList(user.getId());
        return Response.success(childList);
    }

    @PostMapping
    public Response<Void> create(@RequestBody ChildRequest request, Authentication authentication) {
        User user = ClassUtils.getSafeCastInstance(authentication.getPrincipal(), User.class);
        Child child = childService.create(
                user,
                request.getName(),
                request.getBirth(),
                request.getGender(),
                request.getSchool(),
                request.getGrade()
        );
        childService.createDefaultChildAnimon(child);       // 생성된 child에 기본 마스크 4종 지급
        return Response.success();
    }

    @PostMapping("/login/{childId}")
    public Response<Child> login(@PathVariable Integer childId) {
        Child child = childService.login(childId);
        return Response.success(child);
    }

    @PostMapping("/logout/{childId}")
    public Response<Void> logout(@PathVariable Integer childId) {
        childService.logout(childId);
        return Response.success();
    }

    @GetMapping("/{childId}")
    public Response<Child> info(@PathVariable Integer childId) {
        Child child = childService.getChildInfo(childId);
        return Response.success(child);
    }

    @PutMapping("/{childId}")
    public Response<Void> modify(@PathVariable Integer childId,
                              @RequestBody ChildRequest request) {
        childService.modify(childId, request);
        return Response.success();
    }

    @DeleteMapping("/{childId}")
    public Response<Void> delete(@PathVariable Integer childId, Authentication authentication) {
        childService.delete(childId, authentication.getName());
        return Response.success();
    }

    @GetMapping("/{childId}/animons")
    public Response<List<Animon>> animonlist(@PathVariable Integer childId) {
        List<Animon> animonList = childService.getAnimonList(childId);
        return Response.success(animonList);
    }

    @GetMapping("/{childId}/animons/{animonId}")
    public Response<Animon> selectAnimon(@PathVariable Integer childId, @PathVariable Integer animonId) {
        Animon animon = childService.setAnimon(childId, animonId);
        return Response.success(animon);
    }

    // 학교 API
    @PostMapping("/school")
    public Response<?> checkSchool(@RequestBody ChildSchoolRequest request) {
        childService.checkSchool(request.getKeyword());
        return Response.success();
    }

}
