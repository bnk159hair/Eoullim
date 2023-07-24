package com.ssafy.eoullim.model;

import com.ssafy.eoullim.model.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private Integer id;
    private String userName;
    private String phoneNumber;
    private String password;


    public static User fromEntity(UserEntity entity) {
        return new User(
                entity.getId(),
                entity.getUserName(),
                entity.getPhoneNumber(),
                entity.getPassword()
        );
    }

}
