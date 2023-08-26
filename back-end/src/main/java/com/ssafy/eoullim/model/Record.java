package com.ssafy.eoullim.model;

import java.time.LocalDateTime;
import java.util.*;
public class Record {
    private String record_id;
    private String create_time;
    private String video_path;
    private String name;
    private String school;
    private String animonName;

    public Record(Map<String, Object> record) {
        this.record_id = record.get(record_id).toString();
        this.create_time = record.get(create_time).toString();
        this.video_path = record.get(video_path).toString();
        this.name = record.get(name).toString();
        this.school = record.get(school).toString();;
        this.animonName = record.get(animonName).toString();;
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
