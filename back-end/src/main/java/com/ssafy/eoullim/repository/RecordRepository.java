package com.ssafy.eoullim.repository;

import com.ssafy.eoullim.model.entity.RecordEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.*;

public interface RecordRepository extends JpaRepository<RecordEntity, Integer> {
    @Query(value = "select r.record_id, r.create_time, r.video_path, c.name, c.school, a.name as animonName, r.guide_seq, r.timeline " +
            "from record_info as r join child as c on r.participant_id=c.child_id " +
            "join animon as a on c.animon_id=a.animon_id " +
            "where r.master_id = :myId", nativeQuery = true)
    List<Map<String, String>> getRecordList(@Param("myId") Integer myId);
}
