package com.ssafy.eoullim.repository;

import com.ssafy.eoullim.model.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {
}
