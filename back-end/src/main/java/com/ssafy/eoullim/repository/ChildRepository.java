package com.ssafy.eoullim.repository;

import com.ssafy.eoullim.model.entity.ChildEntity;
import com.ssafy.eoullim.model.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChildRepository  extends JpaRepository<ChildEntity, Integer> {

}
