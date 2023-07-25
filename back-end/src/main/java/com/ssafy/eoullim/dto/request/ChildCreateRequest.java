package com.ssafy.eoullim.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

@Getter
@AllArgsConstructor
public class ChildCreateRequest {
    private String name;
    private String birth;
    private char gender;
    private String school;
    private int grade;
}
