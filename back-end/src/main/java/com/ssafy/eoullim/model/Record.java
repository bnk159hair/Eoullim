package com.ssafy.eoullim.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class Record {
    private String record_id;
    private String create_time;
    private String video_path;
    private String name;
    private String school;
    private String animonName;
    private String guide_seq;
    private String timeline;



}
