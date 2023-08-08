package com.ssafy.eoullim.model;

import com.ssafy.eoullim.model.entity.AnimonEntity;
import com.ssafy.eoullim.model.entity.ChildEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Animon {

    private Integer id;
    private String headImagePath;
    private String bodyImagePath;
    private String name;

    public static Animon fromEntity(AnimonEntity entity) {
        return new Animon(
            entity.getId(),
            entity.getHeadImagePath(),
            entity.getBodyImagePath(),
            entity.getName()
        );
    }
}
