package com.ssafy.eoullim.dto.response;

import com.ssafy.eoullim.model.Child;
import com.ssafy.eoullim.model.Status;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Date;

@Getter
@AllArgsConstructor
public class ChildResponse {
    private Integer id = null;
    private String name;
    private Date birth;
    private char gender;
    private String school;
    private Integer grade;

    public static ChildResponse fromChild(Child child) {
        return new ChildResponse(
                child.getId(),
                child.getName(),
                child.getBirth(),
                child.getGender(),
                child.getSchool(),
                child.getGrade()
        );
    }
}
