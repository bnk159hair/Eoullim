package com.ssafy.eoullim.service;

import com.ssafy.eoullim.dto.request.ChildRequest;
import com.ssafy.eoullim.dto.response.Response;
import com.ssafy.eoullim.exception.EoullimApplicationException;
import com.ssafy.eoullim.exception.ErrorCode;
import com.ssafy.eoullim.model.Animon;
import com.ssafy.eoullim.model.Child;
import com.ssafy.eoullim.model.Status;
import com.ssafy.eoullim.model.User;
import com.ssafy.eoullim.model.entity.AnimonEntity;
import com.ssafy.eoullim.model.entity.ChildAnimonEntity;
import com.ssafy.eoullim.model.entity.ChildEntity;
import com.ssafy.eoullim.model.entity.UserEntity;
import com.ssafy.eoullim.repository.AnimonRepository;
import com.ssafy.eoullim.repository.ChildAnimonRepository;
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
    private final ChildAnimonRepository childAnimonRepository;
    private final AnimonRepository animonRepository;

    @Value("${public-api.service-key}")
    private String serviceKey;
    private String schoolApiUrl = "http://api.data.go.kr/openapi/tn_pubr_public_elesch_mskul_lc_api";

    @Transactional
    public Child create(User user, String name, Date birth, char gender, String school, Integer grade) {
        ChildEntity childEntity = ChildEntity.of(UserEntity.of(user), name, birth, gender, school, grade);
        childRepository.save(childEntity);
        // 기본 애니몬 4종을 해당 Child에 부여
        List<Animon> animonList = animonRepository.getDefaultAnimon()
                .stream().map(Animon::fromEntity).collect(Collectors.toList());
        for (Animon animon : animonList) {
            if (animon.getId() == 1) childEntity.setAnimon(AnimonEntity.of(animon));    // 4종 중 1번 애니몬을 선택
            childAnimonRepository.save(ChildAnimonEntity.of(Child.fromEntity(childEntity), animon));
        }
        return Child.fromEntity(childEntity);
    }

    public List<Child> getList(Integer userId) {
        return childRepository.findAllByUserId(userId)
                .stream().map(Child::fromEntity).collect(Collectors.toList());
    }

    @Transactional
    public Child login(Integer childId) {
        ChildEntity childEntity = childRepository.findById(childId).orElseThrow(() ->
                new EoullimApplicationException(ErrorCode.CHILD_NOT_FOUND));
        childEntity.setStatus(Status.ON);
        return Child.fromEntity(childEntity);
    }

    @Transactional
    public void logout(Integer childId) {
        ChildEntity childEntity = childRepository.findById(childId).orElseThrow(() ->
                new EoullimApplicationException(ErrorCode.CHILD_NOT_FOUND));
        childEntity.setStatus(Status.OFF);
    }

    public Child getChildInfo(Integer childId) {
        ChildEntity childEntity = childRepository.findById(childId).orElseThrow(() ->
                new EoullimApplicationException(ErrorCode.CHILD_NOT_FOUND));
        return Child.fromEntity(childEntity);
    }

    @Transactional
    public void modify(Integer childId, ChildRequest request) {
        ChildEntity childEntity = childRepository.findById(childId).orElseThrow(() ->
                new EoullimApplicationException(ErrorCode.CHILD_NOT_FOUND));
        childEntity.setName(request.getName());
        childEntity.setBirth(request.getBirth());
        childEntity.setGender(request.getGender());
        childEntity.setSchool(request.getSchool());
        childEntity.setGrade(request.getGrade());
    }

    @Transactional
    public void delete(Integer childId, String userName) {
        // ERROR : 자녀 ID 잘못 접근 시
        ChildEntity childEntity = childRepository.findById(childId).orElseThrow(() ->
                new EoullimApplicationException(ErrorCode.CHILD_NOT_FOUND));
        // ERROR : 현재 User가 지우려는 자녀 ID 권한이 없는 경우 (다른 사용자의 user를 제거하려 할 경우)
        if (!Objects.equals(childEntity.getUser().getUserName(), userName)) {
            throw new EoullimApplicationException(ErrorCode.INVALID_PERMISSION,
                    String.format("user %s has no permission with child %d", userName, childId));
        }
        childRepository.delete(childEntity);
    }

    public List<Animon> getAnimonList(Integer childId) {
        return childAnimonRepository.findAnimonsByChildId(childId)
                .stream().map(Animon::fromEntity).collect(Collectors.toList());
//        ChildEntity childEntity = childRepository.findById(childId).orElseThrow(() ->
//                new EoullimApplicationException(ErrorCode.CHILD_NOT_FOUND));
//        return childEntity.getAnimonList()
//                .stream().map(ChildAnimonEntity::getAnimonEntity).collect(Collectors.toList())
//                .stream().map(Animon::fromEntity).collect(Collectors.toList());
    }
    @Transactional
    public Animon setAnimon(Integer childId, Integer animonId) {
        ChildAnimonEntity childAnimonEntity = childAnimonRepository.findByChildIdAndAnimonId(childId, animonId).orElseThrow(() ->
                new EoullimApplicationException(ErrorCode.CHILD_NOT_FOUND));
        AnimonEntity animonEntity = childAnimonEntity.getAnimon();
        ChildEntity childEntity = childAnimonEntity.getChild();
        childEntity.setAnimon(animonEntity);
        return Animon.fromEntity(animonEntity);
    }

    public void checkSchool(String keyword) {
        try {
            // API URL Build
            StringBuilder urlBuilder = new StringBuilder(schoolApiUrl);
            urlBuilder.append("?" + URLEncoder.encode("ServiceKey", "UTF-8") + "="+serviceKey);
            urlBuilder.append("&" + URLEncoder.encode("pageNo", "UTF-8") + "="+URLEncoder.encode("1", "UTF-8"));
            urlBuilder.append("&" + URLEncoder.encode("numOfRows", "UTF-8") + "="+URLEncoder.encode("100", "UTF-8"));
            urlBuilder.append("&" + URLEncoder.encode("type", "UTF-8") + "="+URLEncoder.encode("json", "UTF-8"));
            urlBuilder.append("&" + URLEncoder.encode("schoolSe", "UTF-8") + "="+URLEncoder.encode("초등학교", "UTF-8"));
            urlBuilder.append("&" + URLEncoder.encode("schoolNm", "UTF-8") + "="+URLEncoder.encode(keyword+"초등학교", "UTF-8"));
            // http connection
            URL url = new URL(urlBuilder.toString());
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Content-type", "application/json");
            System.out.println("Response code: " + conn.getResponseCode());
            BufferedReader rd;
            if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {    // success
                rd = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
            } else {
                rd = new BufferedReader(new InputStreamReader(conn.getErrorStream(), "UTF-8"));
            }
            StringBuilder outputStringBuilder = new StringBuilder();    // output store
            String line;
            while ((line = rd.readLine()) != null) {
                outputStringBuilder.append(line);
            }
            rd.close();
            conn.disconnect();
            System.out.println(outputStringBuilder.toString());
            // ERROR : 일치하는 초등학교가 없는 경우
            if(outputStringBuilder.toString().contains("NODATA_ERROR")) {
                System.out.println(" 여기 왔나요? ");
                throw new EoullimApplicationException(ErrorCode.DATA_NOT_FOUND,
                        String.format("%s Elementary school has no data", keyword));
            }
            else {          // 나온 결과물을 가지고 갈 수도 있음!! 지금은 쓸모 없으니 그냥 있나 없나만 확인
                return;     // 일치하는 초등학교 있는 경우
            }
        } catch (EoullimApplicationException e) {   // ERROR : 위에서 throw한 DATA_NOT_FOUND throw
            throw e;
        } catch (Exception e) {                     // ERROR : Http Connection (api 호출 과정에서 error)
            throw new EoullimApplicationException(ErrorCode.CONNECTION_ERROR);
        }
    }
}
