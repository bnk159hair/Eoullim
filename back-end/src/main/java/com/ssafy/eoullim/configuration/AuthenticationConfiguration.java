package com.ssafy.eoullim.configuration;

import com.ssafy.eoullim.exception.CustomAuthenticationEntryPoint;
import com.ssafy.eoullim.service.UserService;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class AuthenticationConfiguration extends WebSecurityConfigurerAdapter {

    private final UserService userService;
    @Value("${jwt.secret-key}")
    private String secretKey;


    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().regexMatchers("^(?!/api/).*");

    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
//        http.cors().disable(); // CORS 비활성화 XXX
        //api 테스트 시에 주
        http.csrf().disable()
                .cors() // CORS 설정 추가
                .and()

                .exceptionHandling()
                .authenticationEntryPoint(new CustomAuthenticationEntryPoint())

                .and()
                .authorizeRequests()
                .antMatchers("/api/*/users/join").permitAll()       // 회원가입은 모든 도메인에서 허용
                .antMatchers("/api/*/users/login").permitAll()      // 로그인은 모든 도메인에서 허용
                .antMatchers("/api/*/users/id-check").permitAll()   // 아이디 체크 역시 모든 도메인에서 허용

//                .anyRequest().authenticated() // 나머지 요청은 인증 필요
                .antMatchers("/api/**").authenticated()
                .anyRequest().permitAll()

                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                .and()
                .addFilterBefore(new JwtTokenFilter(userService, secretKey), UsernamePasswordAuthenticationFilter.class);
    }

    //Cors 설정
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.addAllowedOrigin("*");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}