package com.ssafy.backendopenvidu.controller;
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
import java.util.Map;
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
public class RecordController {
    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;

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
