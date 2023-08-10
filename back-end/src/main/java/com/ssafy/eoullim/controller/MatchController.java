package com.ssafy.eoullim.controller;

import com.google.gson.JsonObject;
import com.ssafy.eoullim.dto.request.MatchFriendRequest;
import com.ssafy.eoullim.dto.request.MatchRequest;
import com.ssafy.eoullim.model.Alarm;
import com.ssafy.eoullim.model.Room;
import com.ssafy.eoullim.service.AlarmService;
import com.ssafy.eoullim.service.RecordService;
import io.openvidu.java.client.*;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Recording;
import io.openvidu.java.client.RecordingProperties;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.SessionProperties;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import javax.annotation.PostConstruct;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.expression.ParseException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/meetings")
@RequiredArgsConstructor
public class MatchController {
    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;

    private Queue<Room> matchingQueue = new LinkedList<Room>();
    // Collection to pair session names and OpenVidu Session objects
    private Map<String, Session> mapSessions = new ConcurrentHashMap<>();
    // Collection to pair session names and tokens (the inner Map pairs tokens and
    // role associated)
    private Map<String, Map<String, String>> mapSessionNamesTokens = new ConcurrentHashMap<>();
    // Collection to pair session names and recording objects
    private Map<String, String> sessionRecordings = new ConcurrentHashMap<>();
    private Map<String, Room> mapRooms = new ConcurrentHashMap<>();

    private final RecordService recordService;

    private final AlarmService alarmService;

    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    @PostMapping("/random/start")
    public ResponseEntity<?> startRandom(
            @RequestBody MatchRequest matchRequest
    ) throws OpenViduJavaClientException, OpenViduHttpException {

        Map<String, Object> params = new HashMap<>(); // 빈 파일

        ConnectionProperties connectionProperties = ConnectionProperties
                .fromJson(params)
                .build();


        if(matchingQueue.isEmpty()){ // 비어있다면
            LocalDateTime now = LocalDateTime.now();
            String formatNow = now.format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
            String sessionId = matchRequest.getChildId().toString()+"_"+formatNow; // sessionId 결정

            if (this.mapSessions.get(sessionId) != null) { // 만드려는 세션 Id가 이미 존재하는지
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            else{ // 없는거 확인했으면 세로운 세션 Id 만들기
                try{
                    System.out.println("[EMPTY] Session created: " + sessionId);

                    SessionProperties sessionProperties = new SessionProperties.Builder()
                            .customSessionId(sessionId)
                            .recordingMode(RecordingMode.MANUAL)
                            .build();

                    Session session = openvidu.createSession(sessionProperties);

                    String token = session.createConnection(connectionProperties).getToken();

                    Room newRoom = new Room();
                    newRoom.setSessionId(session.getSessionId());
                    matchingQueue.add(newRoom);

                    Map<String, String> result = new HashMap<>(); // 리턴할 결과 객체
                    result.put("sessionId", session.getSessionId());
                    result.put("token", token);

                    mapSessions.put(sessionId, session);
//                    mapSessionNamesTokens.put(sessionId, new ConcurrentHashMap<>());
//                    mapSessionNamesTokens.get(sessionId).put(token, token);

                    newRoom.setChildOne(matchRequest.getChildId()); // 첫 입장자 아이디 저장
                    mapRooms.put(sessionId, newRoom);

                    return new ResponseEntity<>(result, HttpStatus.OK);

                }catch (Exception e){
                    return getErrorResponse(e);
                }
            }
        }else{ // 비어있지 않다면
            Room existingRoom = matchingQueue.poll();
            String sessionId = existingRoom.getSessionId();
            if(mapSessions.get(sessionId) != null){ // 세션이 정상적으로 존재한다면
                System.out.println("[ALREADY] Session created: " + sessionId);
                String token = mapSessions.get(sessionId).createConnection(connectionProperties).getToken();
//                mapSessionNamesTokens.get(sessionId).put(token, token);
                Map<String, String> result = new HashMap<>();
                result.put("sessionId", sessionId);
                result.put("token", token);
//                mapSessionNamesTokens.get(sessionId).put(token, token);

                RecordingProperties recordingProperties = new RecordingProperties.Builder() // 녹화 설정
                        .outputMode(Recording.OutputMode.INDIVIDUAL)
                        .resolution("640x480")
                        .frameRate(24)
                        .name("VideoInfo")
                        .build();
                Recording recording = openvidu.startRecording(sessionId, recordingProperties); // 녹화 시작

                sessionRecordings.put(sessionId, recording.getId());
                existingRoom.setRecordingId(recording.getId());
                existingRoom.setChildTwo(matchRequest.getChildId()); // 두번째 입장자 아이디 저장

                return new ResponseEntity<>(result, HttpStatus.OK);
            }else{
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
    }
    @PostMapping("/random/stop")
    public ResponseEntity<?> stopRandom(
            @RequestBody Map<String, Object> params
    ) throws OpenViduJavaClientException, OpenViduHttpException, IOException, ParseException, org.json.simple.parser.ParseException {

        String sessionId = (String) params.get("sessionId");
        System.out.println("[STOP] Session created: " + sessionId);

//        if(mapSessions.get(sessionId) != null && mapSessionNamesTokens.get(sessionId) != null && mapRooms.get(sessionId)!= null){
        if(mapSessions.get(sessionId) != null && mapRooms.get(sessionId)!= null){

            Session session = mapSessions.get(sessionId);
            if(matchingQueue.contains(mapRooms.get(sessionId))){ // 매치가 안되었는데 나갔을 경우

                matchingQueue.remove(mapRooms.get(sessionId));
                mapSessions.remove(sessionId);
//                mapSessionNamesTokens.remove(sessionId);
                mapRooms.remove(sessionId);

                return new ResponseEntity<>(HttpStatus.OK);

            }else{ // 매치가 된 후 나갔을 경우
                String recordId = sessionRecordings.get(sessionId);
                Recording recording = openvidu.stopRecording(recordId);

                sessionRecordings.remove(sessionId);
                mapSessions.remove(sessionId);
//                mapSessionNamesTokens.remove(sessionId);

                recordService.writeVideoToDB(recordId, mapRooms.get(sessionId));

                mapRooms.remove(sessionId);
                session.close();
                return new ResponseEntity<>(recording, HttpStatus.OK);
            }
        }else{
            return new ResponseEntity<>( HttpStatus.BAD_REQUEST);
        }
    }

    /* 친구 만나기 */
    @PostMapping("/friend/start")
    public ResponseEntity<?> startFrined(
            @RequestBody MatchFriendRequest matchFriendRequest
    ) throws OpenViduJavaClientException, OpenViduHttpException, IOException, ParseException, org.json.simple.parser.ParseException {

        Map<String, Object> params = new HashMap<>(); // 빈 파일

        ConnectionProperties connectionProperties = ConnectionProperties
                .fromJson(params)
                .build();

        if(matchFriendRequest.getSessionId() == null){ // 존재하는 방이 없을 때
            LocalDateTime now = LocalDateTime.now();
            String formatNow = now.format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
            String sessionId = matchFriendRequest.getChildId().toString()+"_"+formatNow; // sessionId 결정


            if (this.mapSessions.get(sessionId) != null) { // 만드려는 세션 Id가 이미 존재하는지
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            else{ // 없는거 확인했으면 세로운 세션 Id 만들기
                try{
                    System.out.println("[EMPTY] Session created: " + sessionId);

                    SessionProperties sessionProperties = new SessionProperties.Builder()
                            .customSessionId(sessionId)
                            .recordingMode(RecordingMode.MANUAL)
                            .build();

                    Session session = openvidu.createSession(sessionProperties);

                    String token = session.createConnection(connectionProperties).getToken();

                    Room newRoom = new Room();
                    newRoom.setSessionId(session.getSessionId());
                    matchingQueue.add(newRoom);

                    Map<String, String> result = new HashMap<>(); // 리턴할 결과 객체
                    result.put("sessionId", session.getSessionId());
                    result.put("token", token);

                    mapSessions.put(sessionId, session);

                    newRoom.setChildOne(matchFriendRequest.getChildId()); // 첫 입장자 아이디 저장
                    mapRooms.put(sessionId, newRoom);

                    /*
                    알림 서비스 코드 작성
                     */
                    Alarm alarm = new Alarm(sessionId, matchFriendRequest.getName());
                    alarmService.send(matchFriendRequest.getFriendId(), alarm);
                    
                    return new ResponseEntity<>(result, HttpStatus.OK);

                }catch (Exception e){
                    return getErrorResponse(e);
                }
            }
        }else{
            if(mapSessions.get(matchFriendRequest.getSessionId()) != null){ // 방이 실제로 존재할 때
                String sessionId = matchFriendRequest.getSessionId();
                if(mapSessions.get(sessionId) != null){ // 세션이 정상적으로 존재한다면
                    Room existingRoom = mapRooms.get(sessionId);
                    System.out.println("[ALREADY] Session created: " + sessionId);
                    String token = mapSessions.get(sessionId).createConnection(connectionProperties).getToken();
//                    mapSessionNamesTokens.get(sessionId).put(token, token);
                    Map<String, String> result = new HashMap<>();
                    result.put("sessionId", sessionId);
                    result.put("token", token);
//                    mapSessionNamesTokens.get(sessionId).put(token, token);

                    RecordingProperties recordingProperties = new RecordingProperties.Builder() // 녹화 설정
                            .outputMode(Recording.OutputMode.INDIVIDUAL)
                            .resolution("640x480")
                            .frameRate(24)
                            .name("VideoInfo")
                            .build();
                    Recording recording = openvidu.startRecording(sessionId, recordingProperties); // 녹화 시작

                    sessionRecordings.put(sessionId, recording.getId());
                    existingRoom.setRecordingId(recording.getId());
                    existingRoom.setChildTwo(matchFriendRequest.getChildId()); // 두번째 입장자 아이디 저장

                    return new ResponseEntity<>(result, HttpStatus.OK);
                }else{
                    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                }
            }
            else{
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
    }

    @PostMapping("/friend/stop")
    public ResponseEntity<?> stopFriend(
            @RequestBody Map<String, Object> params
    ) throws OpenViduJavaClientException, OpenViduHttpException, IOException, ParseException, org.json.simple.parser.ParseException {

        String sessionId = (String) params.get("sessionId");
        System.out.println("[STOP] Session created: " + sessionId);

        if(mapSessions.get(sessionId) != null  && mapRooms.get(sessionId)!= null){
            Session session = mapSessions.get(sessionId);
            if(matchingQueue.contains(mapRooms.get(sessionId))){ // 매치가 안되었는데 나갔을 경우

                mapSessions.remove(sessionId);
//                mapSessionNamesTokens.remove(sessionId);
                mapRooms.remove(sessionId);

                return new ResponseEntity<>(HttpStatus.OK);

            }else{ // 매치가 된 후 나갔을 경우
                String recordId = sessionRecordings.get(sessionId);
                Recording recording = openvidu.stopRecording(recordId);

                sessionRecordings.remove(sessionId);
                mapSessions.remove(sessionId);
//                mapSessionNamesTokens.remove(sessionId);

                recordService.writeVideoToDB(recordId, mapRooms.get(sessionId));

                mapRooms.remove(sessionId);
                session.close();
                return new ResponseEntity<>(recording, HttpStatus.OK);
            }
        }else{
            return new ResponseEntity<>( HttpStatus.BAD_REQUEST);
        }
    }


//    /* 녹화 정지를 위함 */
//    @PostMapping("/api/sessions/recording/stop")
//    public ResponseEntity<?> stopRecording(
//            @RequestBody(required = false) Map<String, Object> params
//    ) throws OpenViduJavaClientException, OpenViduHttpException {
//        String sessionId = (String) params.get("session");
//
//        try {
//            Recording recording = openvidu.stopRecording(sessionId);
//            return new ResponseEntity<>(recording, HttpStatus.OK);
//        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
//            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//        }
//    }
    private ResponseEntity<JsonObject> getErrorResponse(Exception e) {
        JsonObject json = new JsonObject();
        json.addProperty("cause", e.getCause().toString());
        json.addProperty("error", e.getMessage());
        json.addProperty("exception", e.getClass().getCanonicalName());
        return new ResponseEntity<>(json, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
