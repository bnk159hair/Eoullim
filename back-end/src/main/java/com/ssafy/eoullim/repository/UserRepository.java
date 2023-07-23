package com.ssafy.eoullim.repository;

import com.ssafy.eoullim.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
