package com.ssafy.eoullim.service;

import com.ssafy.eoullim.model.Room;
import com.ssafy.eoullim.model.entity.ChildEntity;
import com.ssafy.eoullim.model.entity.RecordEntity;
import com.ssafy.eoullim.repository.ChildRepository;
import com.ssafy.eoullim.repository.RecordRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

@Slf4j
@Service
@RequiredArgsConstructor
public class RecordService {

    private final RecordRepository roomRepository;
    private final ChildRepository childRepository;

    public void writeVideoToDB(String recordingId, Room room) throws IOException, ParseException {

        System.out.println(room.getChildOne());
        System.out.println(room.getChildTwo());

        /* 압축 해제 코드 시작 */
//        String dir = "C:\\Users\\ssafy\\Downloads\\";
        String dir = "/var/lib/recordings/";

        String recordFolder = dir+recordingId+"/";
        File recordZip = new File(recordFolder, "VideoInfo.zip");

        try(BufferedInputStream in = new BufferedInputStream(new FileInputStream(recordZip))){
            try(ZipInputStream zipInputStream = new ZipInputStream(in)){
                ZipEntry zipEntry = null;

                while((zipEntry = zipInputStream.getNextEntry()) != null){
                    int length = 0;
                    try(BufferedOutputStream out = new BufferedOutputStream((new FileOutputStream(recordFolder + zipEntry.getName())))){
                        while((length = zipInputStream.read()) != -1){
                            out.write(length);
                        }
                        zipInputStream.closeEntry();;
                    }
                }
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        /* 압축 해제 코드 종료 */

        /* JSON Parse 시작 */
        JSONParser parser = new JSONParser();

        Reader reader = new FileReader(recordFolder+"VideoInfo.json");
        JSONObject jsonObject = (JSONObject) parser.parse(reader);

        JSONArray files = (JSONArray) jsonObject.get("files");

        String downDir = "https://i9c207.p.ssafy.io/openvidu/recordings/";
        String downFolder = downDir+recordingId+"/";
        for(int i=0; i< files.size(); i++){
            JSONObject element = (JSONObject) files.get(i);
            String name = String.valueOf(element.get("name"));
            JSONObject clientData = (JSONObject) parser.parse((String)element.get("clientData"));
            int userId = Integer.parseInt((String)clientData.get("childId"));
            ChildEntity user = childRepository.findById(userId).orElseThrow();

            if(room.getChildOne().intValue() == userId){ // 영상의 주인이 첫번째 사람
                ChildEntity participant = childRepository.findById(room.getChildTwo()).orElseThrow();
                roomRepository.save(RecordEntity.of(downFolder+name, user, participant, room.getGuideSeq(), room.getTimeline()));
            }
            if(room.getChildTwo().intValue() == userId){ // 영상의 주인이 두번째 사람
                ChildEntity participant = childRepository.findById(room.getChildOne()).orElseThrow();
                roomRepository.save(RecordEntity.of(downFolder+name, user, participant, room.getGuideSeq(), room.getTimeline()));
            }

        }
        /* JSON Parse 종료 */
    }

    public List<Map<String, String>> getRecordList(Integer myId){
//        for(Map<String, String> i : roomRepository.getRecordList(myId)){
//            log.info(i.values().toString());
//        }
        return roomRepository.getRecordList(myId);
    }
}