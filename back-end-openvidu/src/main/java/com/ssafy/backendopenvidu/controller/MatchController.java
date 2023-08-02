package com.ssafy.backendopenvidu.controller;
import com.ssafy.backendopenvidu.dto.request.MatchRequest;
import com.ssafy.backendopenvidu.model.entity.Room;
import com.ssafy.backendopenvidu.service.MatchService;
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

import java.io.IOException;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.Queue;
import java.util.concurrent.ConcurrentHashMap;
import javax.annotation.PostConstruct;

import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.expression.ParseException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
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
    private Map<String, Map<String, OpenViduRole>> mapSessionNamesTokens = new ConcurrentHashMap<>();
    // Collection to pair session names and recording objects
    private Map<String, Boolean> sessionRecordings = new ConcurrentHashMap<>();
    private Map<String, Room> mapRooms = new ConcurrentHashMap<>();

    private final MatchService matchService;


    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    /**
     * @param params The Session properties
     * @return The Session ID
     */
    @PostMapping("/api/sessions")
    public ResponseEntity<String> initializeSession(
            @RequestBody(required = false) Map<String, Object> params
    ) throws OpenViduJavaClientException, OpenViduHttpException {
        // SessionProperties properties = SessionProperties.fromJson(params).build();
        // Session session = openvidu.createSession(properties);
        String sessionId = (String) params.get("customSessionId");
        RecordingProperties recordingProperties = new RecordingProperties.Builder()
                // .outputMode(Recording.OutputMode.COMPOSED)
                .outputMode(Recording.OutputMode.INDIVIDUAL)
                .resolution("640x480")
                .frameRate(24)
                .name("Test")
                .build();
        SessionProperties sessionProperties = new SessionProperties.Builder()
                .defaultRecordingProperties(recordingProperties)
                .customSessionId(sessionId)
                .recordingMode(RecordingMode.ALWAYS)
                .build();
        Session session = openvidu.createSession(sessionProperties);

        return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
    }

    /**
     * @param sessionId The Session in which to create the Connection
     * @param params    The Connection properties
     * @return The Token associated to the Connection
     */
    @PostMapping("/api/sessions/{sessionId}/connections")
    public ResponseEntity<String> createConnection(
            @PathVariable("sessionId") String sessionId,
            @RequestBody(required = false) Map<String, Object> params
    ) throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = openvidu.getActiveSession(sessionId);
        if (session == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        ConnectionProperties properties = ConnectionProperties
                .fromJson(params)
                .build();
        Connection connection = session.createConnection(properties);
        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
    }

    /**
     * @param params The Session properties
     * @return The Session ID
     */
    @PostMapping("/api/sessions/match")
    public ResponseEntity<?> randomMatch(
            @RequestBody MatchRequest matchRequest
            ) throws OpenViduJavaClientException, OpenViduHttpException {
        OpenViduRole role = OpenViduRole.PUBLISHER;
        Map<String, Object> params = new HashMap<>();
        // Build connectionProperties object with the serverData and the role
//        ConnectionProperties connectionProperties = new ConnectionProperties.Builder().type(ConnectionType.WEBRTC)
//                .role(role).data("user_data").build();
        ConnectionProperties connectionProperties = ConnectionProperties
                .fromJson(params)
                .build();


        if(matchingQueue.isEmpty()){ // 비어있다면
            String sessionId = matchRequest.getChildId().toString()+matchRequest.getGrade();
//            String sessionId = "SessionA";
            System.out.println(sessionId);
            RecordingProperties recordingProperties = new RecordingProperties.Builder()
                    .outputMode(Recording.OutputMode.INDIVIDUAL)
                    .resolution("640x480")
                    .frameRate(24)
                    .name("VideoInfo")
                    .build();
            System.out.println("===========================");

            SessionProperties sessionProperties = new SessionProperties.Builder()
                    .defaultRecordingProperties(recordingProperties)
                    .customSessionId(sessionId)
                    .recordingMode(RecordingMode.MANUAL)
                    .build();
            System.out.println("===========================");

            Session session = openvidu.createSession(sessionProperties);

            String token = session.createConnection(connectionProperties).getToken();

            Room newRoom = new Room();
            newRoom.setSessionId(session.getSessionId());
            matchingQueue.add(newRoom);
            Map<String, String> result = new HashMap<>();
            result.put("sessionId", session.getSessionId());
            result.put("token", token);
            return new ResponseEntity<>(result, HttpStatus.OK);

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

                    newRoom.setChildOne(matchRequest.getChildId()); // 첫 입장자 아이디 저장
                    mapRooms.put(sessionId, newRoom);

                    return new ResponseEntity<>(result, HttpStatus.OK);

                }catch (Exception e){
                    return getErrorResponse(e);
                }
            }
        }else{ // 비어있지 않다면
            System.out.println("--------------------------");

            Room existingRoom = matchingQueue.poll();
            String sessionId = existingRoom.getSessionId();
            if(mapSessions.get(sessionId) != null){ // 세션이 정상적으로 존재한다면
                System.out.println("[ALREADY] Session created: " + sessionId);
                String token = mapSessions.get(sessionId).createConnection(connectionProperties).getToken();
                mapSessionNamesTokens.get(sessionId).put(token, token);
                Map<String, String> result = new HashMap<>();
                result.put("sessionId", sessionId);
                result.put("token", token);
                mapSessionNamesTokens.get(sessionId).put(token, token);

                RecordingProperties recordingProperties = new RecordingProperties.Builder() // 녹화 설정
                        .outputMode(Recording.OutputMode.INDIVIDUAL)
                        .resolution("640x480")
                        .frameRate(24)
                        .name("VideoInfo")
                        .build();
                Recording recording = openvidu.startRecording(sessionId, recordingProperties); // 녹화 시작
                
                sessionRecordings.put(sessionId, recording.getId());
                existingRoom.setRecordingId(recording.getId());
//                mapRooms.put(sessionId, existingRoom);
                existingRoom.setChildTwo(matchRequest.getChildId()); // 두번째 입장자 아이디 저장
                
                return new ResponseEntity<>(result, HttpStatus.OK);
            }else{
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            System.out.println("--------------------------");

            String token = session.createConnection(connectionProperties).getToken();

            Map<String, String> result = new HashMap<>();
            result.put("sessionId", sessionId);
            result.put("token", token);
            System.out.println(sessionId);
            System.out.println(token);
            Recording recording = openvidu.startRecording(sessionId);
            System.out.println("--------------------------");

            existingRoom.setRecordingId(recording.getId());
            mapRooms.put(sessionId, existingRoom);
            return new ResponseEntity<>(result, HttpStatus.OK);

        }
    }
    @PostMapping("/api/sessions/matchstop")
    public ResponseEntity<?> stopMatch(
            @RequestBody Map<String, Object> params
    ) throws OpenViduJavaClientException, OpenViduHttpException, IOException, ParseException, org.json.simple.parser.ParseException {

        String sessionId = (String) params.get("sessionId");
        System.out.println("[STOP] Session created: " + sessionId);



        if(mapSessions.get(sessionId) != null && mapSessionNamesTokens.get(sessionId) != null && mapRooms.get(sessionId)!= null){
            Session session = mapSessions.get(sessionId);
            if(matchingQueue.contains(mapRooms.get(sessionId))){ // 매치가 안되었는데 나갔을 경우

                matchingQueue.remove(mapRooms.get(sessionId));
                mapSessions.remove(sessionId);
                mapSessionNamesTokens.remove(sessionId);
                mapRooms.remove(sessionId);


                return new ResponseEntity<>(HttpStatus.OK);

            }else{ // 매치가 된 후 나갔을 경우
                String recordId = sessionRecordings.get(sessionId);
                Recording recording = openvidu.stopRecording(recordId);

                sessionRecordings.remove(sessionId);
                mapSessions.remove(sessionId);
                mapSessionNamesTokens.remove(sessionId);
                //matchService.writeVideoToDB(recordId, mapRooms.get(sessionId));

                mapRooms.remove(sessionId);
                session.close();



                return new ResponseEntity<>(recording, HttpStatus.OK);
            }
        }else{
            return new ResponseEntity<>( HttpStatus.BAD_REQUEST);

        }

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
}
