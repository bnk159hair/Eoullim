package com.ssafy.eoullim.model;

import com.ssafy.eoullim.model.entity.AnimonEntity;
import com.ssafy.eoullim.model.entity.ChildEntity;
import com.ssafy.eoullim.model.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
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
    private User user;

    public static Child fromEntity(ChildEntity entity) {
        Child child = new Child();
        child.setId(entity.getId());
        child.setName(entity.getName());
        child.setBirth(entity.getBirth());
        child.setGender(entity.getGender());
        child.setSchool(entity.getSchool());
        child.setGrade(entity.getGrade());
        child.setStatus(entity.getStatus());

        AnimonEntity animonEntity = entity.getAnimon();
        if (animonEntity != null) child.setAnimon(Animon.fromEntity(animonEntity));

        UserEntity userEntity = entity.getUser();
        if (userEntity != null) child.setUser(User.fromEntity(userEntity));

        return child;
    }
}
