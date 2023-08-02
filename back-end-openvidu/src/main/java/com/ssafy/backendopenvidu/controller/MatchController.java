package com.ssafy.backendopenvidu.controller;
import com.google.gson.JsonObject;
import com.ssafy.backendopenvidu.dto.request.MatchRequest;
import com.ssafy.backendopenvidu.model.entity.Room;
import io.openvidu.java.client.*;
import io.openvidu.java.client.Connection;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Recording;
import io.openvidu.java.client.RecordingProperties;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.SessionProperties;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.Queue;
import java.util.concurrent.ConcurrentHashMap;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
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


    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    @PostMapping("/api/sessions/match")
    public ResponseEntity<?> randomMatch(
            @RequestBody MatchRequest matchRequest
            ) throws OpenViduJavaClientException, OpenViduHttpException {
        OpenViduRole role = OpenViduRole.PUBLISHER;

        Map<String, Object> params = new HashMap<>();

        ConnectionProperties connectionProperties = ConnectionProperties
                .fromJson(params)
                .build();


        if(matchingQueue.isEmpty()){ // 비어있다면
            String sessionId = matchRequest.getChildId().toString()+matchRequest.getGrade();

            if (this.mapSessions.get(sessionId) != null) { // 만드려는 세션 Id가 이미 존재하는지
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            else{ // 없는거 확인했으면 세로운 세션 Id 만들기
                try{
                    System.out.println("[EMPTY] Session created: " + sessionId);
//                    RecordingProperties recordingProperties = new RecordingProperties.Builder()
//                            .outputMode(Recording.OutputMode.INDIVIDUAL)
//                            .resolution("640x480")
//                            .frameRate(24)
//                            .name("VideoInfo")
//                            .build();

                    SessionProperties sessionProperties = new SessionProperties.Builder()
                            .customSessionId(sessionId)
                            .recordingMode(RecordingMode.MANUAL)
                            .build();

                    Session session = openvidu.createSession(sessionProperties);

                    String token = session.createConnection(connectionProperties).getToken();

                    Room newRoom = new Room();
                    newRoom.setSessionId(session.getSessionId());
                    matchingQueue.add(newRoom);
                    Map<String, String> result = new HashMap<>();
                    result.put("sessionId", session.getSessionId());
                    result.put("token", token);

                    mapSessions.put(sessionId, session);
                    mapSessionNamesTokens.put(sessionId, new ConcurrentHashMap<>());
                    mapSessionNamesTokens.get(sessionId).put(token, token);
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
                mapSessionNamesTokens.get(sessionId).put(token, token);
                Map<String, String> result = new HashMap<>();
                result.put("sessionId", sessionId);
                result.put("token", token);
                System.out.println(sessionId);
                System.out.println(token);
                
                RecordingProperties recordingProperties = new RecordingProperties.Builder() // 녹화 설정
                        .outputMode(Recording.OutputMode.INDIVIDUAL)
                        .resolution("640x480")
                        .frameRate(24)
                        .name("VideoInfo")
                        .build();
                Recording recording = openvidu.startRecording(sessionId, recordingProperties); // 녹화 시작
                
                sessionRecordings.put(sessionId, recording.getId());
                existingRoom.setRecordingId(recording.getId());
                mapRooms.put(sessionId, existingRoom);
                return new ResponseEntity<>(result, HttpStatus.OK);
            }else{
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
    }
    @PostMapping("/api/sessions/matchstop")
    public ResponseEntity<?> stopMatch(
            @RequestBody Map<String, Object> params
    ) throws OpenViduJavaClientException, OpenViduHttpException {
        String sessionId = (String) params.get("sessionId");
        System.out.println("[STOP] Session created: " + sessionId);

        if(mapSessions.get(sessionId) != null && mapSessionNamesTokens.get(sessionId) != null && mapRooms.get(sessionId)!= null){
            Session session = mapSessions.get(sessionId);
            String recordId = sessionRecordings.get(sessionId);
            System.out.println(recordId+ " " + sessionId);
            Recording recording = openvidu.stopRecording(recordId);

            sessionRecordings.remove(sessionId);
            mapSessions.remove(sessionId);
            mapSessionNamesTokens.remove(sessionId);
            mapRooms.remove(sessionId);
            session.close();

            return new ResponseEntity<>(recording, HttpStatus.OK);

        }else{
            return new ResponseEntity<>( HttpStatus.BAD_REQUEST);

        }
//        try {
//            System.out.println("[STOP] Session created: " + sessionId);
//
//            mapRooms.remove(sessionId);
//            System.out.println("[STOP] Session created: " + sessionId);
//
//            Session session = openvidu.getActiveSession(sessionId);
//            System.out.println("[STOP] Session created: " + sessionId);
//
//            session.close();
//            System.out.println("[STOP] Session created: " + sessionId);
//
//            return new ResponseEntity<>(recording, HttpStatus.OK);
//        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
//            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//        }
    }

    /* 녹화를 위함 */
    @PostMapping("/api/sessions/recording/start")
    public ResponseEntity<?> startRecording(
            @RequestBody(required = false) Map<String, Object> params
    ) throws OpenViduJavaClientException, OpenViduHttpException {
        String sessionId = (String) params.get("session");

        // Recording.OutputMode outputMode = Recording.OutputMode.valueOf(
        //   (String) params.get("outputMode")
        // );
        // boolean hasAudio = (boolean) params.get("hasAudio");
        // boolean hasVideo = (boolean) params.get("hasVideo");

        // RecordingProperties properties = new RecordingProperties.Builder()
        //   .outputMode(outputMode)
        //   .hasAudio(hasAudio)
        //   .hasVideo(hasVideo)
        //   .build();

        // System.out.println(
        //   "Starting recording for session " +
        //   sessionId +
        //   " with properties {outputMode=" +
        //   outputMode +
        //   ", hasAudio=" +
        //   hasAudio +
        //   ", hasVideo=" +
        //   hasVideo +
        //   "}"
        // );

        try {
            // Recording recording = openvidu.startRecording(sessionId, properties);
            Recording recording = openvidu.startRecording(sessionId);

            //sessionRecordings.put(sessionId, true);
            return new ResponseEntity<>(recording, HttpStatus.OK);
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    /* 녹화 정지를 위함 */
    @PostMapping("/api/sessions/recording/stop")
    public ResponseEntity<?> stopRecording(
            @RequestBody(required = false) Map<String, Object> params
    ) throws OpenViduJavaClientException, OpenViduHttpException {
        String sessionId = (String) params.get("session");

        try {
            Recording recording = openvidu.stopRecording(sessionId);
            return new ResponseEntity<>(recording, HttpStatus.OK);
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    private ResponseEntity<JsonObject> getErrorResponse(Exception e) {
        JsonObject json = new JsonObject();
        json.addProperty("cause", e.getCause().toString());
        json.addProperty("error", e.getMessage());
        json.addProperty("exception", e.getClass().getCanonicalName());
        return new ResponseEntity<>(json, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
