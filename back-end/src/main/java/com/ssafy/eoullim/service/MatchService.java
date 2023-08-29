package com.ssafy.eoullim.service;

import com.ssafy.eoullim.EoullimApplication;
import com.ssafy.eoullim.dto.response.Response;
import com.ssafy.eoullim.exception.EoullimApplicationException;
import com.ssafy.eoullim.exception.ErrorCode;
import com.ssafy.eoullim.model.Match;
import com.ssafy.eoullim.model.Room;
import com.ssafy.eoullim.utils.RandomGeneratorUtils;
import io.openvidu.java.client.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
@Slf4j
public class MatchService {
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

    private Map<String, String> sessionRecordings = new ConcurrentHashMap<>();
    private Map<String, Room> mapRooms = new ConcurrentHashMap<>();

    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }


    public synchronized Match startRandom(Integer childId) throws OpenViduJavaClientException, OpenViduHttpException, InterruptedException{
        Map<String, Object> params = new HashMap<>(); // 빈 파일

        ConnectionProperties connectionProperties = ConnectionProperties
                .fromJson(params)
                .build();

        LocalDateTime now = LocalDateTime.now();
        String formatNow = now.format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        String sessionId = childId.toString()+"_"+formatNow; // sessionId 결정

        if (this.mapSessions.get(sessionId) != null) { // 만드려는 세션 Id가 이미 존재하는지
            throw new EoullimApplicationException(ErrorCode.MATCH_CONFLICT);
        }
        if(matchingQueue.isEmpty()){ // 비어있다면
            Room newRoom = new Room();
            matchingQueue.add(newRoom);

            System.out.println("[EMPTY] Session created: " + sessionId);

            SessionProperties sessionProperties = new SessionProperties.Builder()
                    .customSessionId(sessionId)
                    .recordingMode(RecordingMode.MANUAL)
                    .build();

            Session session = openvidu.createSession(sessionProperties);

            String token = session.createConnection(connectionProperties).getToken();

            List<Integer> random = RandomGeneratorUtils.generateRandomNumbers(2, 12, 4);

            newRoom.setSessionId(session.getSessionId());
            newRoom.setRandom(random);

            mapSessions.put(sessionId, session);

            newRoom.setChildOne(childId); // 첫 입장자 아이디 저장
            mapRooms.put(sessionId, newRoom);
            Match result = new Match(sessionId, token, random);

            return result;
        }else{ // 비어있지 않다면
            Room existingRoom = matchingQueue.poll();
            sessionId = existingRoom.getSessionId();
            if(mapSessions.get(sessionId) != null){ // 세션이 정상적으로 존재한다면
                System.out.println("[ALREADY] Session created: " + sessionId);
                String token = mapSessions.get(sessionId).createConnection(connectionProperties).getToken();

                Match result = new Match(sessionId, token, existingRoom.getRandom());
                RecordingProperties recordingProperties = new RecordingProperties.Builder() // 녹화 설정
                        .outputMode(Recording.OutputMode.INDIVIDUAL)
                        .resolution("640x480")
                        .frameRate(24)
                        .name("VideoInfo")
                        .build();
                Thread.sleep(3000);

                existingRoom.setChildTwo(childId); // 두번째 입장자 아이디 저장
                Recording recording = openvidu.startRecording(sessionId, recordingProperties); // 녹화 시작
                sessionRecordings.put(sessionId, recording.getId());
                existingRoom.setRecordingId(recording.getId());
                return result;
            }else{
                throw new EoullimApplicationException(ErrorCode.MATCH_NOT_FOUND);
            }
        }
    }
}
