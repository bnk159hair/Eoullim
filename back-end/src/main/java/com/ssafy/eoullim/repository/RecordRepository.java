package com.ssafy.eoullim.repository;

import com.ssafy.eoullim.model.entity.RecordEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.*;

public interface RecordRepository extends JpaRepository<RecordEntity, Integer> {
    @Query(value = "select r from RecordEntity as r join fetch r.master where r.master.id = :masterId")
    List<RecordEntity> getRecordList(@Param("masterId") Integer masterId);

    List<RecordEntity> findRecordEntitiesByMasterId(@Param("masterId") Integer masterId);
}
