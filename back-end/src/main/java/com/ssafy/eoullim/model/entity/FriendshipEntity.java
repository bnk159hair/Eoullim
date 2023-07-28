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
    /*
    create table friendship
    (
    friendship_id	int		auto_increment	primary key,
    my_id			int		not null,
    friend_id		int		not null,
    constraint child1_constraint
        foreign key (my_id) references child (child_id)
            on update cascade on delete cascade,
	constraint child2_constraint
        foreign key (friend_id) references child (child_id)
            on update cascade on delete cascade
    );
    */

    @Id
    @Column(name = "friendship_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id = null;      //PK

    @ManyToOne
    @JoinColumn(name = "my_id", nullable = false, referencedColumnName = "child_id")
    private ChildEntity me;

    @ManyToOne
    @JoinColumn(name = "friend_id", nullable = false, referencedColumnName = "child_id")
    private ChildEntity friend;

    public static FriendshipEntity of(ChildEntity me, ChildEntity friend) {
        FriendshipEntity friendship = new FriendshipEntity();
        friendship.setMe(me);
        friendship.setFriend(friend);
        return friendship;
    }
}
