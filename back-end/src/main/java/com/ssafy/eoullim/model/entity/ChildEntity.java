package com.ssafy.eoullim.model.entity;

import com.ssafy.eoullim.model.Status;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

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
    private String grade;

    @Enumerated(EnumType.STRING)
    private Status status = Status.OFF;

    // TODO: 외래키 연결 해야 함
    @ManyToOne(cascade=CascadeType.REMOVE)
    @JoinColumn(name="mask_id", referencedColumnName="mask_id")
    AnimonEntity mask;
}
