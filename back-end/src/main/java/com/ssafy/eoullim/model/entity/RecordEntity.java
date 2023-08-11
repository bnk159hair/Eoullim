package com.ssafy.eoullim.model.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Setter
@Getter
@Entity
@Table(name="record_info")
@NoArgsConstructor
public class RecordEntity {
    public RecordEntity(Integer recordId, String videoPath, Integer masterId, Integer participantId) {
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
    @CreationTimestamp
    private LocalDateTime createTime;

    @Column(name="video_path")
    private String videoPath;

    @Column(name="master_id")
    private Integer masterId;

    @Column(name="participant_id")
    private Integer participantId;

    public static RecordEntity of(String videoPath, Integer masterId, Integer participantId){
        return new RecordEntity(
                null,
                videoPath,
                masterId,
                participantId
        );
    }

}
