package com.ssafy.eoullim.repository;

import com.ssafy.eoullim.model.entity.ChildEntity;
import com.ssafy.eoullim.model.entity.RecordEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.*;

public interface RecordRepository extends JpaRepository<RecordEntity, Integer> {
//    @Query(value = "select r.record_id, r.create_time, r.video_path, c.name, c.school, a.name as animonName, r.guide_seq, r.timeline " +
//            "from record_info as r join child as c on r.participant_id=c.child_id " +
//            "join animon as a on c.animon_id=a.animon_id " +
//            "where r.master_id = :myId", nativeQuery = true)
    @Query(value = "select r.recordId as record_id, r.createTime as create_time, r.videoPath as video_path, r.participant.name as name, " +
            "r.participant.school as school, r.participant.animon.name as animonName from RecordEntity as r " +
            "where r.master.id = :myId")
    List<HashMap<String, String>> getRecordList(@Param("myId") Integer myId);
}
