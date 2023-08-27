package com.ssafy.eoullim.model;

import com.ssafy.eoullim.dto.request.ChildRequest;
import com.ssafy.eoullim.model.entity.ChildEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@AllArgsConstructor
public class Child {

    private Integer id;
    private String name;
    private Date birth;
    private char gender;
    private String school;
    private Integer grade;
    private Status status;
    private Animon animon;

    public static Child fromEntity(ChildEntity entity) {
        return new Child(
                entity.getId(),
                entity.getName(),
                entity.getBirth(),
                entity.getGender(),
                entity.getSchool(),
                entity.getGrade(),
                entity.getStatus(),
                Animon.fromEntity(entity.getAnimon())
        );
    }

    public static Child of(ChildRequest request) {
        return new Child(
                null,
                request.getName(),
                request.getBirth(),
                request.getGender(),
                request.getSchool(),
                request.getGrade(),
                null,
                null
        );
    }
}
