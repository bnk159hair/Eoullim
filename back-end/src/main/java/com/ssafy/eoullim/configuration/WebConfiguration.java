package com.ssafy.eoullim.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfiguration implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
//		System.out.println("CORS Setting");
//		default 설정.
//		Allow all origins.
//		Allow "simple" methods GET, HEAD and POST.
//		Allow all headers.
//		Set max age to 1800 seconds (30 minutes).
        registry.addMapping("/**")
                .allowedOrigins("*")
//		        .allowedOrigins("http://localhost:8080", "http://localhost:8081")
                .allowedMethods(HttpMethod.GET.name(),
                        HttpMethod.POST.name(),
                        HttpMethod.PUT.name(),
                        HttpMethod.DELETE.name(),
                        HttpMethod.HEAD.name(),
                        HttpMethod.OPTIONS.name(),
                        HttpMethod.PATCH.name())
                .allowedHeaders("*") // 요청 헤더 허용 (원하는 헤더를 지정해도 됨)
//			    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH", "HEAD")
//              .allowCredentials(true) // 쿠키 인증 요청 허용
                .maxAge(3000);          // 원하는 시간만큼 pre-flight 리퀘스트를 캐싱
    }

}
