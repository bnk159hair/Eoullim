package com.ssafy.eoullim.repository;

import com.ssafy.eoullim.model.entity.AnimonEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AnimonRepository extends JpaRepository<AnimonEntity, Integer> {
    @Query(value = "SELECT A FROM AnimonEntity A WHERE A.id BETWEEN 1 and 4")
    List<AnimonEntity> getDefaultAnimon();
}
