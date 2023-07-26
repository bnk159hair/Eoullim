package com.ssafy.eoullim.repository;

import com.ssafy.eoullim.model.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    Optional<UserEntity> findByUserName(String userName);
    Optional<UserEntity> findByIdAndPassword(Integer userId, String password);
}
