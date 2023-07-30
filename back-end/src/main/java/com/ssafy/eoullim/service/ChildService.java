package com.ssafy.eoullim.service;

import com.ssafy.eoullim.dto.request.ChildRequest;
import com.ssafy.eoullim.dto.response.Response;
import com.ssafy.eoullim.exception.EoullimApplicationException;
import com.ssafy.eoullim.exception.ErrorCode;
import com.ssafy.eoullim.model.Child;
import com.ssafy.eoullim.model.Status;
import com.ssafy.eoullim.model.User;
import com.ssafy.eoullim.model.entity.ChildEntity;
import com.ssafy.eoullim.model.entity.UserEntity;
import com.ssafy.eoullim.repository.ChildRepository;
import com.ssafy.eoullim.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChildService {
    private final ChildRepository childRepository;

    @Value("${public-api.service-key}")
    private String serviceKey;
    private String schoolApiUrl = "http://api.data.go.kr/openapi/tn_pubr_public_elesch_mskul_lc_api";

    public void create(User user, String name, Date birth, char gender, String school, int grade) {
        childRepository.save(ChildEntity.of(UserEntity.of(user), name, birth, gender, school, grade));
    }

    public List<Child> list(Integer userId) {
        return childRepository.findAllByUserId(userId).stream().map(Child::fromEntity).collect(Collectors.toList());
    }

    @Transactional
    public Child login(Integer childId) {
        ChildEntity childEntity = childRepository.findById(childId).orElseThrow(() ->
                new EoullimApplicationException(ErrorCode.CHILD_NOT_FOUND, String.format("childId is %d", childId)));
        childEntity.setStatus(Status.ON);
        return Child.fromEntity(childEntity);
    }
    public Child info(Integer childId) {
        ChildEntity childEntity = childRepository.findById(childId).orElseThrow(() ->
                new EoullimApplicationException(ErrorCode.CHILD_NOT_FOUND, String.format("childId is %d", childId)));
        return Child.fromEntity(childEntity);
    }

    @Transactional
    public void modify(Integer childId, ChildRequest request) {
        ChildEntity childEntity = childRepository.findById(childId).orElseThrow(() ->
                new EoullimApplicationException(ErrorCode.CHILD_NOT_FOUND, String.format("childId is %d", childId)));
        childEntity.setName(request.getName());
        childEntity.setBirth(request.getBirth());
        childEntity.setGender(request.getGender());
        childEntity.setSchool(request.getSchool());
        childEntity.setGrade(request.getGrade());
    }

    public void delete(Integer childId, String userName) {
        // ERROR : 자녀 ID 잘못 접근 시
        ChildEntity childEntity = childRepository.findById(childId).orElseThrow(()
                -> new EoullimApplicationException(ErrorCode.CHILD_NOT_FOUND, String.format("childId is %d", childId)));
        // ERROR : 현재 User가 지우려는 자녀 ID 권한이 없는 경우 (다른 사용자의 user를 제거하려 할 경우)
        if (!Objects.equals(childEntity.getUser().getUserName(), userName)) {
            throw new EoullimApplicationException(ErrorCode.INVALID_PERMISSION,
                    String.format("user %s has no permission with child %d", userName, childId));
        }
        childRepository.deleteById(childId);
    }
}
