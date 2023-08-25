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

    @ManyToOne
    @JoinColumn(name="master_id", nullable = false, referencedColumnName = "child_id")
    private ChildEntity master;

    @ManyToOne
    @JoinColumn(name="participant_id", nullable = false, referencedColumnName = "child_id")
    private ChildEntity participant;

    @Column(name="guide_seq")
    private String guideSeq;

    @Column(name="timeline")
    private String timeline;

    public RecordEntity(Integer recordId, String videoPath, ChildEntity master, ChildEntity participant, String guideSeq, String timeline) {
        this.recordId = recordId;
        this.videoPath = videoPath;
        this.master = master;
        this.participant = participant;
        this.guideSeq = guideSeq;
        this.timeline = timeline;
    }

    public static RecordEntity of(String videoPath, ChildEntity master, ChildEntity participant, String guideSeq, String timeline){
        return new RecordEntity(
                null,
                videoPath,
                master,
                participant,
                guideSeq,
                timeline
        );
    }

}
