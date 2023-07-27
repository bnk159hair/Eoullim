package com.ssafy.eoullim.controller;

import com.ssafy.eoullim.dto.request.ChildCreateRequest;
import com.ssafy.eoullim.dto.request.ChildSchoolRequest;
import com.ssafy.eoullim.dto.response.ChildResponse;
import com.ssafy.eoullim.dto.response.Response;
import com.ssafy.eoullim.dto.response.UserLoginResponse;
import com.ssafy.eoullim.model.Child;
import com.ssafy.eoullim.model.User;
import com.ssafy.eoullim.model.entity.ChildEntity;
import com.ssafy.eoullim.service.ChildService;
import com.ssafy.eoullim.utils.ClassUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/children")
@RequiredArgsConstructor
public class ChildController {

    private final ChildService childService;

    @GetMapping
    public Response<List<ChildEntity>> list()  {
        return Response.success();
    }

    // 자녀 등록
    @PostMapping
    public Response<Void> create(@RequestBody ChildCreateRequest request, Authentication authentication) {

        User user = ClassUtils.getSafeCastInstance(authentication.getPrincipal(), User.class);
        childService.create(
                user,
                request.getName(),
                request.getBirth(),
                request.getGender(),
                request.getSchool(),
                request.getGrade()
        );
        return Response.success();
    }

    // 특정 자녀 선택
    @PostMapping("/{childId}")
    public Response<Child> select(@PathVariable Integer childId){
        Child child = childService.select(childId);
        return Response.success(child);
    }

    // 특정 자녀 정보 상세보기
    @GetMapping("/")
    public Response<?> postInfo(@PathVariable("postNo") int postNo) {
        return Response.success();
    }

    // 특정 자녀 수정
    @PutMapping("/{childId}")
    public Response<?> modify(@PathVariable Integer childId,
                              @RequestBody ChildCreateRequest request,
                              Authentication authentication) {

        return Response.success();
    }

    // 특정 자녀 삭제
    @DeleteMapping("/{childId}")
    public Response<Void> delete(@PathVariable Integer childId, Authentication authentication) {
        childService.delete(childId, authentication.getName());
        return Response.success();
    }

    // 학교 API
    @GetMapping("/school")
    public Response<?> getSchoolName(@RequestBody ChildSchoolRequest request) {
        String serviceKey = "Ng3w6w1%2B7JypSInrX8Wa10b9j0G6%2F9ailN1XP%2FuO9oB7gfAImwjczu8kP%2F9JfDsX0wLbLW9%2Bv3NZsh2XG1Gw8Q%3D%3D";
        try {
            StringBuilder urlBuilder = new StringBuilder("http://api.data.go.kr/openapi/tn_pubr_public_elesch_mskul_lc_api");
            urlBuilder.append("?" + URLEncoder.encode("ServiceKey", "UTF-8") + "="+serviceKey);
            urlBuilder.append("&" + URLEncoder.encode("pageNo", "UTF-8") + "="+URLEncoder.encode("1", "UTF-8"));
            urlBuilder.append("&" + URLEncoder.encode("numOfRows", "UTF-8") + "="+URLEncoder.encode("100", "UTF-8"));
            urlBuilder.append("&" + URLEncoder.encode("type", "UTF-8") + "="+URLEncoder.encode("json", "UTF-8"));
            urlBuilder.append("&" + URLEncoder.encode("schoolSe", "UTF-8") + "="+URLEncoder.encode("초등학교", "UTF-8"));
            urlBuilder.append("&" + URLEncoder.encode("schoolNm", "UTF-8") + "="+URLEncoder.encode(request.getKeyword(), "UTF-8"));

            URL url = new URL(urlBuilder.toString());
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Content-type", "application/json");
            System.out.println("Response code: " + conn.getResponseCode());
            BufferedReader rd;
            if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
                rd = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
            } else {
                rd = new BufferedReader(new InputStreamReader(conn.getErrorStream(), "UTF-8"));
            }
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = rd.readLine()) != null) {
                sb.append(line);
            }
            rd.close();
            conn.disconnect();
            System.out.println(sb.toString());
            HashMap<String, String> result = childService.getSchoolName(request.getKeyword());
        } catch (Exception e) {
            System.out.println("실패");
            e.printStackTrace();;
        }

        return Response.success();
    }

    // 애니몬 조회

    // 영상 조회

}
