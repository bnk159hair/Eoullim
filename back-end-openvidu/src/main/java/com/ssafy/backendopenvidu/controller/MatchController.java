package com.ssafy.backendopenvidu.controller;
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
    private Map<String, Map<String, OpenViduRole>> mapSessionNamesTokens = new ConcurrentHashMap<>();
    // Collection to pair session names and recording objects
    private Map<String, Boolean> sessionRecordings = new ConcurrentHashMap<>();
    private Map<String, Room> mapRooms = new ConcurrentHashMap<>();


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

        // Build connectionProperties object with the serverData and the role
        ConnectionProperties connectionProperties = new ConnectionProperties.Builder().type(ConnectionType.WEBRTC)
                .role(role).data("user_data").build();

        if(matchingQueue.isEmpty()){ // 비어있다면
            String sessionId = matchRequest.getChildId().toString()+matchRequest.getName();
            RecordingProperties recordingProperties = new RecordingProperties.Builder()
                    // .outputMode(Recording.OutputMode.COMPOSED)
                    .outputMode(Recording.OutputMode.INDIVIDUAL)
                    .resolution("640x480")
                    .frameRate(24)
                    .name("VideoInfo")
                    .build();
            SessionProperties sessionProperties = new SessionProperties.Builder()
                    .defaultRecordingProperties(recordingProperties)
                    .customSessionId(sessionId)
                    .recordingMode(RecordingMode.MANUAL)
                    .build();
            Session session = openvidu.createSession(sessionProperties);

            String token = session.createConnection(connectionProperties).getToken();

            Room newRoom = new Room();
            newRoom.setSessionId(session.getSessionId());
            matchingQueue.add(newRoom);
            Map<String, String> result = new HashMap<>();
            result.put("sessionId", sessionId);
            result.put("token", token);
            return new ResponseEntity<>(result, HttpStatus.OK);

        }else{ // 비어있지 않다면
            Room existingRoom = matchingQueue.poll();
            String sessionId = existingRoom.getSessionId();
            Session session = openvidu.getActiveSession(sessionId);
            if (session == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            String token = session.createConnection(connectionProperties).getToken();

            Map<String, String> result = new HashMap<>();
            result.put("sessionId", sessionId);
            result.put("token", token);

            Recording recording = openvidu.startRecording(sessionId);
            existingRoom.setRecordingId(recording.getId());
            mapRooms.put(sessionId, existingRoom);
            return new ResponseEntity<>(result, HttpStatus.OK);

        }
    }
    @PostMapping("/api/sessions/matchstop")
    public ResponseEntity<?> stopMatch(
            @RequestBody Map<String, Object> params
    ) throws OpenViduJavaClientException, OpenViduHttpException {
        String sessionId = (String) params.get("sessionId");

        try {
            Recording recording = openvidu.stopRecording(sessionId);
            mapRooms.remove(sessionId);
            Session session = openvidu.getActiveSession(sessionId);
            session.close();
            return new ResponseEntity<>(recording, HttpStatus.OK);
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
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
