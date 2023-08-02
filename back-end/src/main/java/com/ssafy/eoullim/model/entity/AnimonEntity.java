package com.ssafy.eoullim.model.entity;

import com.ssafy.eoullim.model.Animon;
import com.ssafy.eoullim.model.Child;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter
@Entity
@Table(name="animon")
@NoArgsConstructor
@AllArgsConstructor
public class AnimonEntity {
    @Id
    @Column(name = "animon_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "image_path", nullable = false)
    private String imagePath;

    @Column(name = "name", nullable = false)
    private String name;

    public static AnimonEntity of(Animon animon) {
        return new AnimonEntity(
                animon.getId(),
                animon.getImagePath(),
                animon.getName()
        );
    }
}
