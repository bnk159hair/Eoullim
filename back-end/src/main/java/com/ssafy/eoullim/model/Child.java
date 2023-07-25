package com.ssafy.eoullim.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ssafy.eoullim.dto.request.ChildCreateRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class Child {

}
