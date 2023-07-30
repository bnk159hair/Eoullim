package com.ssafy.eoullim.service;

import com.ssafy.eoullim.exception.EoullimApplicationException;
import com.ssafy.eoullim.exception.ErrorCode;
import com.ssafy.eoullim.model.Animon;
import com.ssafy.eoullim.model.Child;
import com.ssafy.eoullim.model.entity.AnimonEntity;
import com.ssafy.eoullim.model.entity.ChildAnimonEntity;
import com.ssafy.eoullim.model.entity.ChildEntity;
import com.ssafy.eoullim.repository.ChildAnimonRepository;
import com.ssafy.eoullim.repository.ChildRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnimonService {
    private final ChildRepository childRepository;
    private final ChildAnimonRepository childAnimonRepository;

    public List<Animon> list(Integer childId) {
        return childAnimonRepository.findAnimonsByChildId(childId)
                .stream().map(Animon::fromEntity).collect(Collectors.toList());
//        ChildEntity childEntity = childRepository.findById(childId).orElseThrow(() ->
//                new EoullimApplicationException(ErrorCode.CHILD_NOT_FOUND));
//        return childEntity.getAnimonList()
//                .stream().map(ChildAnimonEntity::getAnimonEntity).collect(Collectors.toList())
//                .stream().map(Animon::fromEntity).collect(Collectors.toList());
    }
}
