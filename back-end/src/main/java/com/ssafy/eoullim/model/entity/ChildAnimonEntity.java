package com.ssafy.eoullim.model.entity;

import com.ssafy.eoullim.model.Animon;
import com.ssafy.eoullim.model.Child;
import lombok.AllArgsConstructor;
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
@AllArgsConstructor
public class ChildAnimonEntity {
    @Id
    @Column(name = "child_animon_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "child_id", referencedColumnName = "child_id", nullable = false)
    private ChildEntity child;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "animon_id", referencedColumnName = "animon_id", nullable = false)
    private AnimonEntity animon;

    public static ChildAnimonEntity of(ChildEntity child, AnimonEntity animon) {
        return new ChildAnimonEntity(null, child, animon);
    }
}
