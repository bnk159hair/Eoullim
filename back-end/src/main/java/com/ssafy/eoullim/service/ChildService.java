package com.ssafy.eoullim.service;

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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


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

    public void create(User user, String name, String birth, char gender, String school, int grade) {
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

        childRepository.save(ChildEntity.of(UserEntity.of(user), name, birthDate , gender, school, grade));

    }

    public Page<Child> list(Pageable pageable) {

        return childRepository.findAll(pageable).map(Child::fromEntity);
    }

    @Transactional
    public Child select(Integer childId) {
        ChildEntity childEntity = childRepository.findById(childId).orElseThrow(() ->
                new EoullimApplicationException(ErrorCode.CHILD_NOT_FOUND, String.format("postId is %d", childId)));
        childEntity.setStatus(Status.ON);
        return Child.fromEntity(childEntity);
    }
}
