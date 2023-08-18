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

    @Column(name="guide_seq")
    private String guideSeq;

    @Column(name="timeline")
    private String timeline;

    public RecordEntity(Integer recordId, String videoPath, Integer masterId, Integer participantId, String guideSeq, String timeline) {
        this.recordId = recordId;
        this.videoPath = videoPath;
        this.masterId = masterId;
        this.participantId = participantId;
        this.guideSeq = guideSeq;
        this.timeline = timeline;
    }

    public static RecordEntity of(String videoPath, Integer masterId, Integer participantId, String guideSeq, String timeline){
        return new RecordEntity(
                null,
                videoPath,
                masterId,
                participantId,
                guideSeq,
                timeline
        );
    }

}
