package com.ssafy.eoullim.model.entity;

import com.ssafy.eoullim.model.Animon;
import com.ssafy.eoullim.model.Child;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Setter
@Getter
@Entity
@Table(name = "child_animon")
@NoArgsConstructor
public class ChildAnimonEntity {
    @Id
    @Column(name = "child_animon_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "child_id")
    private ChildEntity child;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "animon_id")
    private AnimonEntity animon;

    public static ChildAnimonEntity of(Child child, Animon animon) {
        ChildAnimonEntity childAnimonEntity = new ChildAnimonEntity();
        childAnimonEntity.setChild(ChildEntity.of(child));
        childAnimonEntity.setAnimon(AnimonEntity.of(animon));
        return childAnimonEntity;
    }
}
