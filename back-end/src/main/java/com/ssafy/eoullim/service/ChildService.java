package com.ssafy.eoullim.service;

import com.ssafy.eoullim.exception.EoullimApplicationException;
import com.ssafy.eoullim.exception.ErrorCode;
import com.ssafy.eoullim.model.entity.ChildEntity;
import com.ssafy.eoullim.model.entity.UserEntity;
import com.ssafy.eoullim.repository.ChildRepository;
import com.ssafy.eoullim.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class ChildService {
    private final ChildRepository childRepository;
    private final UserRepository userRepository;

    public void create(String userName, String name, String birth, char gender, String school, int grade) {
        // TODO: 나중에 front 단에서 쓸 수 있는 비동기로 바꾸가
        // 자녀 이름 중복 체크
//        childRepository.selectChildByName(userName, name).ifPresent(it -> {
//            throw new EoullimApplicationException(ErrorCode.DUPLICATED_USER_NAME, String.format("childName is %s", name));
//        });

        // String -> Date Formatter (yyyyMMdd)
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
        Date birthDate = null;
        try {
            birthDate = dateFormat.parse(birth);
        } catch (ParseException e) {
            // String이 yyyyMMdd 형식이 아닌 경우 THROW DATA ERROR
            throw new EoullimApplicationException(ErrorCode.INVALID_DATA, String.format("birth is %s", birth));
        }
        
        // DB에 저장할 DATA 전달해서 저장
        childRepository.save(ChildEntity.of(userRepository.findByUserName(userName).get(), name, birthDate , gender, school, grade));
        return;
    }

}
