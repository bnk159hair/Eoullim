package com.ssafy.eoullim.model.entity;

import com.ssafy.eoullim.model.UserRole;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Setter //setter 추가
@Getter
@Entity
@Table(name = "user")
@NoArgsConstructor
public class UserEntity {

    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id = null;      //primary Key

    @Column(name = "name", nullable = false)
    private String name;            //user real name

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @Column(name = "user_name", unique = true, nullable = false)
    private String userName;        //userId

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private UserRole role = UserRole.USER;

    public static UserEntity of(String userName, String encodedPwd, String name, String phoneNumber) {
        UserEntity entity = new UserEntity();
        entity.setUserName(userName);
        entity.setPassword(encodedPwd);
        entity.setName(name);
        entity.setPhoneNumber(phoneNumber);
        return entity;
    }

}
