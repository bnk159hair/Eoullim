package com.ssafy.eoullim.service;

import com.ssafy.eoullim.dto.request.ChildRequest;
import com.ssafy.eoullim.exception.EoullimApplicationException;
import com.ssafy.eoullim.exception.ErrorCode;
import com.ssafy.eoullim.model.*;
import com.ssafy.eoullim.model.entity.AnimonEntity;
import com.ssafy.eoullim.model.entity.ChildAnimonEntity;
import com.ssafy.eoullim.model.entity.ChildEntity;
import com.ssafy.eoullim.model.entity.UserEntity;
import com.ssafy.eoullim.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.List;

import java.util.Date;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChildService {

    private final ChildRepository childRepository;
    private final ChildAnimonRepository childAnimonRepository;
    private final AnimonRepository animonRepository;
    private final ChildCacheRepository childCacheRepository;

    @Value("${public-api.service-key}")
    private String serviceKey;
    private String schoolApiUrl = "http://api.data.go.kr/openapi/tn_pubr_public_elesch_mskul_lc_api";

    public List<Child> getChildList(Integer userId) {
        return childRepository.findAllByUserId(userId)
                .stream().map(Child::fromEntity).collect(Collectors.toList());
    }

    @Transactional
    public void create(User user, String name, Date birth, char gender, String school, Integer grade) {
        ChildEntity childEntity = ChildEntity.of(UserEntity.of(user), name, birth, gender, school, grade);
        childRepository.save(childEntity);
        // 기본 애니몬 4종을 해당 Child에 부여
        List<AnimonEntity> animonList = animonRepository.getDefaultAnimon();
        for (AnimonEntity animonEntity : animonList) {
            if (animonEntity.getId() == 1) childEntity.setAnimon(animonEntity);    // 4종 중 1번 애니몬을 선택
            childAnimonRepository.save(ChildAnimonEntity.of(childEntity, animonEntity));
        }
    }


    @Transactional
    public Child login(Integer childId) {
        ChildEntity childEntity = childRepository.findById(childId).orElseThrow(
                () -> new EoullimApplicationException(ErrorCode.CHILD_NOT_FOUND,
                        String.format("child %d is not found", childId)));
//        childEntity.setStatus(Status.ON);
        childCacheRepository.setStatus(childId);
        return Child.fromEntity(childEntity);
    }

    @Transactional
    public void logout(Integer childId) {
        ChildEntity childEntity = childRepository.findById(childId).orElseThrow(
                () -> new EoullimApplicationException(ErrorCode.CHILD_NOT_FOUND,
                        String.format("child %d is not found", childId)));
//        childEntity.setStatus(Status.OFF);
        childCacheRepository.delete(childId);
    }


    public Child getChildInfo(Integer childId, Integer userId) {
        // ERROR: 찾으려는 아이가 없음
        ChildEntity childEntity = childRepository.findById(childId).orElseThrow(
                () -> new EoullimApplicationException(ErrorCode.CHILD_NOT_FOUND,
                        String.format("child %d is not found", childId)));
        // ERROR: 사용자가 해당 child에 접근 권한 없음
        if(!childEntity.getUser().getId().equals(userId))
            throw new EoullimApplicationException(ErrorCode.FORBIDDEN_NO_PERMISSION,
                    String.format("you have no permission with child %d", childId));
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
    public void delete(Integer childId, Integer userId) {
        // ERROR : 자녀 ID 잘못 접근 시
        ChildEntity childEntity = childRepository.findById(childId).orElseThrow(() ->
                new EoullimApplicationException(ErrorCode.CHILD_NOT_FOUND));
        // ERROR : 현재 User가 지우려는 자녀 ID 권한이 없는 경우 (다른 사용자의 user를 제거하려 할 경우)
        if(!childEntity.getUser().getId().equals(userId))
            throw new EoullimApplicationException(ErrorCode.FORBIDDEN_NO_PERMISSION,
                    String.format("you have no permission with child %d", childId));
        childRepository.delete(childEntity);
    }

    public List<Animon> getAnimonList(Integer childId) {
        return childAnimonRepository.findAnimonsByChildId(childId)
                .stream().map(Animon::fromEntity).collect(Collectors.toList());
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

    /**
     * 화상 회의 중 상대방 Child의 가면 정보를 얻어오기 위함
     * @param childId : 애니몬 정보를 알고자 하는 child의 ID (상대방 ID)
     * @return Animon 객체 (ID, 얼굴 이미지 경로, 전신 이미지 경로)
     */
    public Friend getProfileAnimonByChild(Integer childId) {
        ChildEntity childEntity = childRepository.findById(childId).orElseThrow(
                () -> new EoullimApplicationException(ErrorCode.CHILD_NOT_FOUND));
        return Friend.fromEntity(childEntity);
    }

    /**
     * Child (프로필) 생성 시 학교가 실제 존재하는 학교인지 검색하는 Open API
     * @param keyword : 실제 초등학교 이름 (OO초등학교에서 OO)
     */
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
