package com.ssafy.eoullim.model.entity;

import com.ssafy.eoullim.model.Child;
import com.ssafy.eoullim.model.Status;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Setter
@Getter
@Entity
@Table(name = "child")
@NoArgsConstructor
public class ChildEntity {
    @Id
    @Column(name = "child_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date birth;

    @Column(nullable = false)
    private char gender;

    @Column(nullable = false)
    private String school;

    @Column(nullable = false)
    private Integer grade;

    @Enumerated(EnumType.STRING)
    private Status status = Status.OFF;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "animon_id")
    private AnimonEntity animon;

    public static ChildEntity of(UserEntity user, Child child) {
        ChildEntity entity = new ChildEntity();
        entity.setName(child.getName());
        entity.setBirth(child.getBirth());
        entity.setGender(child.getGender());
        entity.setSchool(child.getSchool());
        entity.setGrade(child.getGrade());
        entity.setUser(user);
        return entity;
    }
}
