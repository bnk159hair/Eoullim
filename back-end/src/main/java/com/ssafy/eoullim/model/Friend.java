package com.ssafy.eoullim.model;

import com.ssafy.eoullim.model.entity.ChildEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Date;

@Getter
@AllArgsConstructor
public class Friend {
    private Integer id;
    private String name;
    private Animon animon;

    public static Friend fromEntity(ChildEntity entity) {
        return new Friend(
                entity.getId(),
                entity.getName(),
                Animon.fromEntity(entity.getAnimon())
        );
    }
}
