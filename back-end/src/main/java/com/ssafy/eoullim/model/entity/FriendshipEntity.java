package com.ssafy.eoullim.model.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter
@Entity
@Table(name="friendship")
@NoArgsConstructor
@AllArgsConstructor
public class FriendshipEntity {
    @Id
    @Column(name = "friendship_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "child_id", nullable = false, referencedColumnName = "child_id")
    private ChildEntity child;

    @ManyToOne
    @JoinColumn(name = "friend_id", nullable = false, referencedColumnName = "child_id")
    private ChildEntity friend;

    public static FriendshipEntity of(ChildEntity child, ChildEntity friend) {
        FriendshipEntity friendship = new FriendshipEntity();
        friendship.setChild(child);
        friendship.setFriend(friend);
        return friendship;
    }
}
