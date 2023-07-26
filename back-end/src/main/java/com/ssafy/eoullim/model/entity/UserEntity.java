package com.ssafy.eoullim.model.entity;

import com.ssafy.eoullim.dto.request.UserJoinRequest;
import com.ssafy.eoullim.model.User;
import com.ssafy.eoullim.model.UserRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Setter //setter 추가
@Getter
@Entity
@Table(name = "user")
@NoArgsConstructor
@AllArgsConstructor
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

//    @OneToMany
//    @JoinColumn(name = "user_id")
//    private List<ChildEntity> children = new ArrayList<>();

    public static UserEntity of(UserJoinRequest request) {
        return new UserEntity(
                null,
                request.getName(),
                request.getPhoneNumber(),
                request.getUserName(),
                request.getPassword(),
                UserRole.USER
        );
    }

    public static UserEntity of(User user) {
        return new UserEntity(
                user.getId(),
                user.getName(),
                user.getPhoneNumber(),
                user.getUsername(),
                user.getPassword(),
                user.getRole()
        );
    }
}
