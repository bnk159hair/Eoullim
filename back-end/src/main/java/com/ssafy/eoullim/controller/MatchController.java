package com.ssafy.eoullim.controller;

import com.ssafy.eoullim.dto.request.MatchFriendRequest;
import com.ssafy.eoullim.dto.request.MatchRequest;
import com.ssafy.eoullim.model.Match;
import com.ssafy.eoullim.service.AlarmService;
import com.ssafy.eoullim.service.MatchService;
import com.ssafy.eoullim.service.RecordService;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Recording;

import java.io.IOException;
import java.util.*;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.expression.ParseException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/v1/meetings")
@RequiredArgsConstructor
public class MatchController {
    private final RecordService recordService;
    private final AlarmService alarmService;
    private final MatchService matchService;

    @PostMapping("/random/start")
    @Transactional
    public synchronized ResponseEntity<?> startRandom(
            @RequestBody MatchRequest matchRequest
    ) {
        Match result = null;
        try{
            result = matchService.startRandom(matchRequest.getChildId());

        } catch (OpenViduJavaClientException e) {
            log.info(e.getMessage());
            throw new RuntimeException(e);
        } catch (OpenViduHttpException e) {
            log.info(e.getMessage());
            throw new RuntimeException(e);
        } catch (InterruptedException e) {
            log.info(e.getMessage());
            throw new RuntimeException(e);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @PostMapping("/random/stop")
    public ResponseEntity<?> stopRandom(
            @RequestBody Map<String, Object> params
    ) throws OpenViduJavaClientException, OpenViduHttpException, IOException, ParseException, org.json.simple.parser.ParseException {

        String sessionId = (String) params.get("sessionId");
        String guideSeq = (String) params.get("guideSeq");
        String timeline = (String) params.get("timeline");
        log.info("Random Stop Called " + sessionId);

        Recording recording = null;

        try{
            recording = matchService.stopRandom(sessionId, guideSeq, timeline, recordService);
        } catch (OpenViduJavaClientException e) {
            log.info(e.getMessage());
            throw new RuntimeException(e);
        } catch (OpenViduHttpException e) {
            log.info(e.getMessage());
            throw new RuntimeException(e);
        } catch (IOException e) {
            log.info(e.getMessage());
            throw new RuntimeException(e);
        } catch (org.json.simple.parser.ParseException e) {
            log.info(e.getMessage());
            throw new RuntimeException(e);
        }
        return new ResponseEntity<>(recording, HttpStatus.OK);
    }

    /* 친구 만나기 */
    @PostMapping("/friend/start")
    public ResponseEntity<?> startFrined(
            @RequestBody MatchFriendRequest matchFriendRequest
    ) {

        String existSessionId = matchFriendRequest.getSessionId();
        Integer childId = matchFriendRequest.getChildId();
        String childName = matchFriendRequest.getName();
        Integer friendId = matchFriendRequest.getFriendId();

        Match result = null;
        try{
            result = matchService.startFriend(childId, childName, friendId, existSessionId, alarmService);
        } catch (OpenViduJavaClientException e) {
            log.info(e.getMessage());
            throw new RuntimeException(e);
        } catch (OpenViduHttpException e) {
            log.info(e.getMessage());
            throw new RuntimeException(e);
        } catch (ParseException e){
            log.info(e.getMessage());
            throw new RuntimeException(e);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);

    }

    @PostMapping("/friend/stop")
    public ResponseEntity<?> stopFriend(
            @RequestBody Map<String, Object> params
    ) {

        String sessionId = (String) params.get("sessionId");
        Recording recording = null;
        try{
            recording = matchService.stopFriend(sessionId, recordService);
        } catch (OpenViduJavaClientException e) {
            log.info(e.getMessage());
            throw new RuntimeException(e);
        } catch (OpenViduHttpException e) {
            log.info(e.getMessage());
            throw new RuntimeException(e);
        } catch (IOException e) {
            log.info(e.getMessage());
            throw new RuntimeException(e);
        } catch (org.json.simple.parser.ParseException e) {
            log.info(e.getMessage());
            throw new RuntimeException(e);
        }
        return new ResponseEntity<>(recording, HttpStatus.OK);
    }

}
