package com.ssafy.eoullim.controller;

import com.ssafy.eoullim.dto.request.ChildCreateRequest;
import com.ssafy.eoullim.dto.response.ChildResponse;
import com.ssafy.eoullim.dto.response.Response;
import com.ssafy.eoullim.dto.response.UserLoginResponse;
import com.ssafy.eoullim.model.Child;
import com.ssafy.eoullim.model.User;
import com.ssafy.eoullim.model.entity.ChildEntity;
import com.ssafy.eoullim.service.ChildService;
import com.ssafy.eoullim.utils.ClassUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/children")
@RequiredArgsConstructor
public class ChildController {

    private final ChildService childService;

    @GetMapping
    public Response<Page<ChildResponse>> list(Pageable pageable) {
        return Response.success(childService.list(pageable).map(ChildResponse::fromChild));
    }

    // 자녀 등록
    @PostMapping
    public Response<Void> create(@RequestBody ChildCreateRequest request, Authentication authentication) {

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
    @PostMapping("/{childId}")
    public Response<Child> select(@PathVariable Integer childId){
        Child child = childService.select(childId);
        return Response.success(child);
    }

    // 특정 자녀 정보 상세보기
    @GetMapping("/")
    public Response<?> postInfo(@PathVariable("postNo") int postNo) {
        return Response.success();
    }

    // 특정 자녀 수정
    @PutMapping("/")
    public Response<?> modify() {
        return Response.success();
    }

    // 특정 자녀 삭제

    // 애니몬 조회

    // 영상 조회

}
