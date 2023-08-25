package com.ssafy.eoullim.controller;

import com.ssafy.eoullim.service.RecordService;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/recordings")
@RequiredArgsConstructor
public class RecordController {

    private final RecordService recordService;

    @GetMapping("/{childId}")
    public ResponseEntity<?> getRecording(@PathVariable Integer childId
    ) throws OpenViduJavaClientException, OpenViduHttpException {
        List<Map<String, Object>> list = recordService.getRecordList(childId);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}
