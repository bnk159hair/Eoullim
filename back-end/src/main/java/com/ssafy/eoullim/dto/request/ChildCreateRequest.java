package com.ssafy.eoullim.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

@Getter
@AllArgsConstructor
public class ChildCreateRequest {
    // 자녀 정보
    private String name;        // front 단에서 비동기 처리
    private String birth;       //yyyyMMdd 형식의 String
    private char gender;        //남자는 M, 여자는 W
    private String school;
    private int grade;          // front 단에서 1~6만 선택할 수 있는 드롭다운 추천
}
