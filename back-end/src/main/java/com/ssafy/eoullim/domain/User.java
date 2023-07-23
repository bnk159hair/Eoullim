package com.ssafy.eoullim.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "user")
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id = null;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "tel")
    private String tel;

    @Column(name = "user_id", unique = true)
    private String userId;

    private String password;

}
