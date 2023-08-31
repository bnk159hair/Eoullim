package com.ssafy.eoullim.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    // 400 Bad Request
    DUPLICATED_NAME(HttpStatus.BAD_REQUEST, "Duplicated user name"),
    DUPLICATED_FRIEND(HttpStatus.BAD_REQUEST, "이미 등록된 친구입니다."),
    INVALID_DATA(HttpStatus.BAD_REQUEST, "Invalid data"),
    // 401 Unauthorized
    INVALID_TOKEN(HttpStatus.UNAUTHORIZED, "Invalid token"),
    // 403 Forbidden
    FORBIDDEN_INVALID_PASSWORD(HttpStatus.FORBIDDEN, "Invalid password"),
    FORBIDDEN_NO_PERMISSION(HttpStatus.FORBIDDEN, "Invalid Permission"),
    // 404 Not Found
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "User not found"),
    CHILD_NOT_FOUND(HttpStatus.NOT_FOUND, "Child not found"),
    DATA_NOT_FOUND(HttpStatus.NOT_FOUND, "Data not found"),
    MATCH_NOT_FOUND(HttpStatus.NOT_FOUND, "Match not found"),
    // 409 Conflict
    MATCH_CONFLICT(HttpStatus.CONFLICT, "Match Conflict"),

    // 500 Internal Server Error
    DATABASE_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "Database error occurs"),
    CONNECTION_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "API Connection error occurs"),
    NOTIFICATION_CONNECT_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "Connect to notification occurs error"),
    OPENVIDU_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "Openvidu server error occurs"),
    OPENVIDU_HTTP_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "Openvidu http error occurs")
    ;

    private final HttpStatus status;
    private final String message;
}
