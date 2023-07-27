package com.ssafy.eoullim.model.entity;

import com.ssafy.eoullim.model.UserRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter
@Entity
@Table(name="`like`")
@NoArgsConstructor
@AllArgsConstructor
public class LikeEntity {
    @Id
    @Column(name = "like_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id = null;      //PK

    @ManyToOne
    @JoinColumn(name = "following_id", nullable = false, referencedColumnName = "child_id")
    private ChildEntity following;

    @ManyToOne
    @JoinColumn(name = "follower_id", nullable = false, referencedColumnName = "child_id")
    private ChildEntity follower;

    public static LikeEntity of(ChildEntity following, ChildEntity follower) {
        LikeEntity like = new LikeEntity();
        like.setFollowing(following);
        like.setFollower(follower);
        return like;
    }
}
