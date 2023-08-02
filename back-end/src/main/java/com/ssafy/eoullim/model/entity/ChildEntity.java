package com.ssafy.eoullim.model.entity;

import com.ssafy.eoullim.model.Animon;
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

    @Column(name = "name", nullable = false)
    private String name;

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

    // child 삭제할 때 cascade delete를 위함.
//    @OneToMany(mappedBy = "child", cascade = CascadeType.ALL)
//    private List<ChildAnimonEntity> childAnimons;

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

    public static ChildEntity of(Child child) {
        ChildEntity entity = new ChildEntity();
        entity.setUser(UserEntity.of(child.getUser()));

        entity.setId(child.getId());
        entity.setName(child.getName());
        entity.setBirth(child.getBirth());
        entity.setGender(child.getGender());
        entity.setSchool(child.getSchool());
        entity.setGrade(child.getGrade());

        Animon animon = child.getAnimon();
        if (animon != null) entity.setAnimon(AnimonEntity.of(animon));
        return entity;
    }
}
