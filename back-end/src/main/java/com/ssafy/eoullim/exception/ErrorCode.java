package com.ssafy.eoullim.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    INVALID_TOKEN(HttpStatus.UNAUTHORIZED, "Invalid token"),
    INVALID_PASSWORD(HttpStatus.UNAUTHORIZED, "Invalid password"),
    INVALID_PERMISSION(HttpStatus.UNAUTHORIZED, "Invalid Permission"),
    INVALID_DATA(HttpStatus.UNAUTHORIZED, "Invalid data"),
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "User not founded"),
    CHILD_NOT_FOUND(HttpStatus.NOT_FOUND, "Child not founded"),
    DATA_NOT_FOUND(HttpStatus.NOT_FOUND, "Data not founded"),
    DUPLICATED_USER_NAME(HttpStatus.CONFLICT, "Duplicated user name"),
    DATABASE_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "Database error occurs"),
    CONNECTION_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "API Connection error occurs"),
    LIKE_ALREADY_FOUND(HttpStatus.FOUND, "Like Relationship already founded"),
    ;

    private final HttpStatus status;
    private final String message;
}
