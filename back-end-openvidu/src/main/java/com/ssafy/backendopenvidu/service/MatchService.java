package com.ssafy.backendopenvidu.service;

import com.ssafy.backendopenvidu.model.Room;
import com.ssafy.backendopenvidu.model.entity.RoomEntity;
import com.ssafy.backendopenvidu.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

@Service
@RequiredArgsConstructor
public class MatchService {

    private final RoomRepository roomRepository;

    public void writeVideoToDB(String recordingId, Room room) throws IOException, ParseException {

        System.out.println(room.getChildOne());
        System.out.println(room.getChildTwo());

        /* 압축 해제 코드 시작 */
        //recordingId = "103";
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
            String name = (String)element.get("name");
            JSONObject clientData = (JSONObject) parser.parse((String)element.get("clientData"));
            int userId = Integer.parseInt((String)clientData.get("childId"));
            System.out.println(userId);
            if(room.getChildOne().intValue() == userId){ // 영상의 주인이 첫번째 사람
                System.out.println("---");
                roomRepository.save(RoomEntity.of(downFolder+name, userId, room.getChildTwo()));
            }
            if(room.getChildTwo().intValue() == userId){ // 영상의 주인이 두번째 사람
                System.out.println("---");

                roomRepository.save(RoomEntity.of(downFolder+name, userId, room.getChildOne()));

            }

        }


        /* JSON Parse 종료 */

    }
}
