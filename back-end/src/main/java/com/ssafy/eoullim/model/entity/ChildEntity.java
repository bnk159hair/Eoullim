package com.ssafy.eoullim.model.entity;

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
    private Integer id = null;      //primary Key

    @Column(name = "name", nullable = false)
    private String name;            //user real name

    @Column(name = "birth", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date birth;

    @Column(name = "gender", nullable = false)
    private char gender;

    @Column(name = "school", nullable = false)
    private String school;

    @Column(name = "grade", nullable = false)
    private Integer grade;

    @Enumerated(EnumType.STRING)
    private Status status = Status.OFF;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "animon_id")
    private AnimonEntity animon;

    @Getter
    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "child_animon_id")
    private List<ChildAnimonEntity> animonList;

    public static ChildEntity of(UserEntity user, String name, Date birth, char gender, String school, int grade) {
        ChildEntity entity = new ChildEntity();
        entity.setName(name);
        entity.setBirth(birth);
        entity.setGender(gender);
        entity.setSchool(school);
        entity.setGrade(grade);
        entity.setUser(user);
        return entity;
    }
}
