package com.ssafy.eoullim.configuration;

import com.ssafy.eoullim.exception.CustomAuthenticationEntryPoint;
import com.ssafy.eoullim.filter.JwtTokenFilter;
import com.ssafy.eoullim.model.User;
import com.ssafy.eoullim.service.UserService;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class AuthenticationConfiguration extends WebSecurityConfigurerAdapter {

    private final UserService userService;
    private final RedisTemplate<String, Object> blackList;
    @Value("${jwt.secret-key}")
    private String secretKey;

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().regexMatchers("^(?!/api/).*");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeRequests()
                .antMatchers("/api/*/users/join", "/api/*/users/login").permitAll()
                .antMatchers("/api/*/users/id-check").permitAll()
                .antMatchers("/api/**").authenticated()
                .anyRequest().permitAll()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(new CustomAuthenticationEntryPoint())
                .and()
                .addFilterBefore(new JwtTokenFilter(userService, blackList, secretKey), UsernamePasswordAuthenticationFilter.class);
    }
}