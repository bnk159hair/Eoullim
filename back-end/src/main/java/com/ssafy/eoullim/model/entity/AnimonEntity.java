package com.ssafy.eoullim.model.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter
@Entity
@Table(name="animon")
@NoArgsConstructor
public class AnimonEntity {
    @Id
    @Column(name = "animon_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "head_image_path", nullable = false)
    private String headImagePath;

    @Column(name = "body_image_path", nullable = false)
    private String bodyImagePath;

    @Column(name = "name", nullable = false)
    private String name;
}
