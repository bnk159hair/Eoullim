package com.ssafy.eoullim.service;

import com.ssafy.eoullim.repository.ChildRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
@Service
@RequiredArgsConstructor
public class ChildService {
    private final ChildRepository childRepository;


}
