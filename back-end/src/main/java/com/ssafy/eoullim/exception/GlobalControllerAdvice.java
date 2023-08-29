package com.ssafy.eoullim.exception;

import com.ssafy.eoullim.dto.response.Response;
import io.openvidu.java.client.OpenViduException;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import static com.ssafy.eoullim.exception.ErrorCode.*;


@Slf4j
@RestControllerAdvice
public class GlobalControllerAdvice {

    @ExceptionHandler(EoullimApplicationException.class)
    public ResponseEntity<?> errorHandler(EoullimApplicationException e) {
        // 여기서 ERROR CODE 안에 있는 status랑 message, 또한 추가로 exception으로 온 message
        log.error("Error occurs {}", e.toString());
        return ResponseEntity.status(e.getErrorCode().getStatus())
                .body(Response.error(e.getErrorCode().name()));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> databaseErrorHandler(IllegalArgumentException e) {
        log.error("Error occurs {}", e.toString());
        return ResponseEntity.status(DATABASE_ERROR.getStatus())
                .body(Response.error(DATABASE_ERROR.name()));
    }

    @ExceptionHandler(OpenViduHttpException.class)
    public ResponseEntity<?> openviduErrorHandler(OpenViduHttpException e) {
        log.error("Error occurs {}", e.toString());
        return ResponseEntity.status(OPENVIDU_HTTP_ERROR.getStatus())
                .body(Response.error(OPENVIDU_HTTP_ERROR.name()));
    }
    @ExceptionHandler(OpenViduJavaClientException.class)
    public ResponseEntity<?> openviduErrorHandler(OpenViduJavaClientException e) {
        log.error("Error occurs {}", e.toString());
        return ResponseEntity.status(OPENVIDU_SERVER_ERROR.getStatus())
                .body(Response.error(OPENVIDU_SERVER_ERROR.name()));
    }
    @ExceptionHandler(InterruptedException.class)
    public ResponseEntity<?> InterruptHandler(InterruptedException e) {
        log.error("Error occurs {}", e.toString());
        return ResponseEntity.status(OPENVIDU_SERVER_ERROR.getStatus())
                .body(Response.error(OPENVIDU_SERVER_ERROR.name()));
    }

}
