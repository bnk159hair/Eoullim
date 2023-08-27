package com.ssafy.eoullim.model;

import com.ssafy.eoullim.model.entity.ChildEntity;
import com.ssafy.eoullim.model.entity.RecordEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class Record {
    private Integer id;
    private String create_time;
    private String video_path;
    private String name;
    private String school;
    private String animonName;
    private String guide_seq;
    private String timeline;

    public static Record fromEntity(RecordEntity entity) {
        return new Record(
                entity.getId(),
                entity.getCreateTime().toString(),
                entity.getVideoPath(),
                entity.getParticipant().getName(),
                entity.getParticipant().getSchool(),
                entity.getParticipant().getAnimon().getName(),
                entity.getGuideSeq(),
                entity.getTimeline()
        );
    }

}
