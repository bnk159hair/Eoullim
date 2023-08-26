package com.ssafy.eoullim.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
public class Record {
    private Integer record_id;
    private LocalDateTime create_time;
    private String video_path;
    private String name;
    private String school;
    private String animonName;

}
