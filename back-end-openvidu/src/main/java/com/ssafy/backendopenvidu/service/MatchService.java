package com.ssafy.backendopenvidu.service;

import com.ssafy.backendopenvidu.model.entity.Room;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

@Service
@RequiredArgsConstructor
public class MatchService {

    //private final

    public void writeVideoToDB(String sessionId, Room room) throws IOException, ParseException {

        System.out.println(room.getChildOne());
        System.out.println(room.getChildTwo());

        /* 압축 해제 코드 시작 */
        sessionId = "103";
        String dir = "C:\\Users\\ssafy\\Downloads\\";
        String recordFolder = dir+sessionId+"\\";
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

        for(int i=0; i< files.size(); i++){
            JSONObject element = (JSONObject) files.get(i);
            String name = (String)element.get("name");
            JSONObject clientData = (JSONObject) parser.parse((String)element.get("clientData"));
            String userId = (String)clientData.get("childId");

        }


        /* JSON Parse 종료 */

    }
}
