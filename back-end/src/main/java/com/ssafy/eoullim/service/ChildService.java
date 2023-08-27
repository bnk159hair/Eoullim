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

    public List<Child> getChildrenList(Integer userId) {
        return childRepository.findAllByUserId(userId)
                .stream().map(Child::fromEntity).collect(Collectors.toList());
    }

    @Transactional
    public void create(User user, ChildRequest request) {
        ChildEntity childEntity = ChildEntity.of(UserEntity.of(user), Child.of(request));
        childRepository.save(childEntity);

        // 기본 애니몬 4종을 해당 Child에 부여
        List<AnimonEntity> animons = animonRepository.getDefaultAnimon();
        for (AnimonEntity animonEntity : animons) {
            if (animonEntity.getId() == 1) childEntity.setAnimon(animonEntity); // 4종 중 1번 애니몬을 선택
            childAnimonRepository.save(ChildAnimonEntity.of(childEntity, animonEntity));
        }
    }


    @Transactional
    public Child login(Integer childId) {
        ChildEntity childEntity = childRepository.findById(childId).orElseThrow(
                () -> new EoullimApplicationException(ErrorCode.CHILD_NOT_FOUND));
        childCacheRepository.setStatus(childId);
        return Child.fromEntity(childEntity);
    }

    @Transactional
    public void logout(Integer childId) {
        childRepository.findById(childId).orElseThrow(
                () -> new EoullimApplicationException(ErrorCode.CHILD_NOT_FOUND));
        childCacheRepository.delete(childId);
    }

    public Child getChildInfo(Integer childId, Integer userId) {
        ChildEntity childEntity = childRepository.findById(childId).orElseThrow(
                () -> new EoullimApplicationException(ErrorCode.CHILD_NOT_FOUND));

        if(!childEntity.getUser().getId().equals(userId))
            throw new EoullimApplicationException(ErrorCode.FORBIDDEN_NO_PERMISSION);
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
        ChildEntity childEntity = childRepository.findById(childId).orElseThrow(() ->
                new EoullimApplicationException(ErrorCode.CHILD_NOT_FOUND));

        if(!childEntity.getUser().getId().equals(userId))
            throw new EoullimApplicationException(ErrorCode.FORBIDDEN_NO_PERMISSION);
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

    public Friend getParticipantInfo(Integer participantId) {
        ChildEntity participant = childRepository.findById(participantId).orElseThrow(
                () -> new EoullimApplicationException(ErrorCode.CHILD_NOT_FOUND));
        return Friend.fromEntity(participant);
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
