package com.ssafy.eoullim.model;

import com.ssafy.eoullim.model.entity.ChildEntity;
import com.ssafy.eoullim.model.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.persistence.*;
import java.util.Date;

@Getter
@AllArgsConstructor
public class Child {

    private Integer id;
    private String name;
    private Date birth;
    private char gender;
    private String school;
    private int grade;
    private Status status;

    public static Child fromEntity(ChildEntity entity) {
        return new Child(
                entity.getId(),
                entity.getName(),
                entity.getBirth(),
                entity.getGender(),
                entity.getSchool(),
                entity.getGrade(),
                entity.getStatus()
        );
    }
}
