package com.ssafy.backendopenvidu.model.entity;
import com.ssafy.backendopenvidu.model.Room;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Setter
@Getter
@Entity
@Table(name="record_info")
@NoArgsConstructor
//@AllArgsConstructor
public class RoomEntity {
    public RoomEntity(Integer recordId, String videoPath, Integer masterId, Integer participantId) {
        this.recordId = recordId;
        this.videoPath = videoPath;
        this.masterId = masterId;
        this.participantId = participantId;
    }

    @Id
    @Column(name="record_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer recordId;

    @Column(name="create_time")
//    @Temporal(value = TemporalType.TIMESTAMP)
    private String createTime;

    @Column(name="video_path")
    private String videoPath;

    @Column(name="master_id")
    private Integer masterId;

    @Column(name="participant_id")
    private Integer participantId;

    public static RoomEntity of(String videoPath, Integer masterId, Integer participantId){
        return new RoomEntity(
                null,
                videoPath,
                masterId,
                participantId
        );
    }

}
