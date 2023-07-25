package com.ssafy.eoullim.controller;

import com.ssafy.eoullim.dto.response.Response;
import com.ssafy.eoullim.model.entity.ChildEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/children")
@RequiredArgsConstructor
public class ChildController {
    // 사용자의 자녀 리스트 조회
    @GetMapping
    public Response<List<ChildEntity>> list(@RequestBody )  {

    }

    // 자녀 등록
    @PostMapping
    public Response<Void> create(@RequestBody ) {

    }

    // 특정 자녀 선택 (로그인)
    @PostMapping("/select")

    // 특정 자녀 정보 상세보기
    @GetMapping(value = "{childId}")
    public Response<?> postInfo(@PathVariable("postNo") int postNo) {

    }

    // 특정 자녀 수정
    @PutMapping("/")
    public Response<?> modify() {

    }

    // 특정 자녀 삭제

    // 애니몬 조회

    // 영상 조회
}
