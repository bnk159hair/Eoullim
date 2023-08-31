package com.ssafy.eoullim.controller;

import com.ssafy.eoullim.service.RecordService;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.ssafy.eoullim.model.Record;

import java.util.*;

@Slf4j
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/recordings")
@RequiredArgsConstructor
public class RecordController {

    private final RecordService recordService;

    @GetMapping("/{childId}")
    public ResponseEntity<?> getRecording(@PathVariable Integer childId
    ) throws OpenViduJavaClientException, OpenViduHttpException {
        List<Record> list = recordService.getRecordList(childId);

        for(Record i : list){
            log.info(i.toString());

        }
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}
