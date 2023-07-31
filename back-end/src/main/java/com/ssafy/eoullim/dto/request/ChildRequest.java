package com.ssafy.eoullim.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ChildRequest {
    // 자녀 정보
    private String name;        // front 단에서 비동기 처리
    private Date birth;
    private char gender;        //남자는 M, 여자는 W
    private String school;
    private Integer grade;          // front 단에서 1~3 선택할 수 있는 드롭다운
}
