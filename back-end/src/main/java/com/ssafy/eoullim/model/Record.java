package com.ssafy.eoullim.model;

import java.time.LocalDateTime;

public class Record {
    private String record_id;
    private String create_time;
    private String video_path;
    private String name;
    private String school;
    private String animonName;

    public Record(Integer record_id, LocalDateTime create_time, String video_path, String name, String school, String animonName) {
        this.record_id = record_id.toString();
        this.create_time = create_time.toString();
        this.video_path = video_path;
        this.name = name;
        this.school = school;
        this.animonName = animonName;
    }

    @Override
    public String toString() {
        return "Record{" +
                "record_id='" + record_id + '\'' +
                ", create_time='" + create_time + '\'' +
                ", video_path='" + video_path + '\'' +
                ", name='" + name + '\'' +
                ", school='" + school + '\'' +
                ", animonName='" + animonName + '\'' +
                '}';
    }
}
