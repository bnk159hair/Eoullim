package com.ssafy.eoullim.exception;

import com.ssafy.eoullim.dto.Response;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import static com.ssafy.eoullim.exception.ErrorCode.DATABASE_ERROR;


@Slf4j
@RestControllerAdvice
public class GlobalControllerAdvice {

    @ExceptionHandler(EoullimApplicationException.class)
    public ResponseEntity<?> errorHandler(EoullimApplicationException e) {
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
}
