package com.ssafy.eoullim.controller;

import com.ssafy.eoullim.dto.request.ChildSchoolRequest;
import com.ssafy.eoullim.dto.request.ChildRequest;
import com.ssafy.eoullim.dto.response.Response;
import com.ssafy.eoullim.model.Animon;
import com.ssafy.eoullim.model.Child;
import com.ssafy.eoullim.model.Friend;
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
    public Response<List<Child>> getChildrenList(Authentication authentication) {
        User user = ClassUtils.getSafeCastInstance(authentication.getPrincipal(), User.class);
        List<Child> childrenList = childService.getChildrenList(user.getId());
        return Response.success(childrenList);
    }

    @PostMapping
    public Response<Void> create(@RequestBody ChildRequest request, Authentication authentication) {
        User user = ClassUtils.getSafeCastInstance(authentication.getPrincipal(), User.class);
        childService.create(user, request);
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
    public Response<Child> getChildInfo(@PathVariable Integer childId, Authentication authentication) {
        User user = ClassUtils.getSafeCastInstance(authentication.getPrincipal(), User.class);  // 현재 api를 요청한 사용자(Client)
        Child child = childService.getChildInfo(childId, user.getId());
        return Response.success(child);
    }

    @GetMapping("/participant/{participantId}")
    public Response<Friend> getParticipantInfo(@PathVariable Integer participantId) {
        Friend friend = childService.getParticipantInfo(participantId);
        return Response.success(friend);
    }

    @PutMapping("/{childId}")
    public Response<Void> modify(@PathVariable Integer childId,
                              @RequestBody ChildRequest request) {
        childService.modify(childId, request);
        return Response.success();
    }

    @DeleteMapping("/{childId}")
    public Response<Void> delete(@PathVariable Integer childId, Authentication authentication) {
        User user = ClassUtils.getSafeCastInstance(authentication.getPrincipal(), User.class);
        childService.delete(childId, user.getId());
        return Response.success();
    }

    @GetMapping("/{childId}/animons")
    public Response<List<Animon>> getAnimonList(@PathVariable Integer childId) {
        List<Animon> animonList = childService.getAnimonList(childId);
        return Response.success(animonList);
    }

    @GetMapping("/{childId}/animons/{animonId}")
    public Response<Animon> selectAnimon(@PathVariable Integer childId, @PathVariable Integer animonId) {
        Animon animon = childService.setAnimon(childId, animonId);
        return Response.success(animon);
    }

    @PostMapping("/school")
    public Response<Void> checkSchool(@RequestBody ChildSchoolRequest request) {
        childService.checkSchool(request.getKeyword());
        return Response.success();
    }

}
