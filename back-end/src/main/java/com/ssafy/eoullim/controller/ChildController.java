package com.ssafy.eoullim.controller;

import com.ssafy.eoullim.dto.request.ChildCreateRequest;
import com.ssafy.eoullim.dto.response.Response;
import com.ssafy.eoullim.model.entity.ChildEntity;
import com.ssafy.eoullim.service.ChildService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/children")
@RequiredArgsConstructor
public class ChildController {

    private final ChildService childService;
    // 사용자의 자녀 리스트 조회
    @GetMapping
    public Response<List<ChildEntity>> list()  {
        return Response.success();
    }

    // 자녀 등록
    @Transactional
    @PostMapping
    public Response<Void> create(@RequestBody ChildCreateRequest request, Authentication authentication) {
        // 지금은 request를 getter로 풀었지만, service 단의 새로운 객체를 만드는 것도 고려 가능
        childService.create(authentication.getName(), request.getName(), request.getBirth(), request.getGender(), request.getSchool(), request.getGrade());
        return Response.success();
    }

    // 특정 자녀 선택 (로그인)
    @PostMapping("/select")

    // 특정 자녀 정보 상세보기
    @GetMapping(value = "{childId}")
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
