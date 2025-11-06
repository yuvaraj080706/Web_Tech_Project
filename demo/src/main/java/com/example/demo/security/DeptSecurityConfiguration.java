package com.example.demo.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@Order(3)
public class DeptSecurityConfiguration {

    @Autowired
    private UserDetailsService myDeptDetailsService;

    @Bean
    public BCryptPasswordEncoder encodePassword() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider deptAuthProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(myDeptDetailsService);
        authProvider.setPasswordEncoder(encodePassword());
        return authProvider;
    }

    @Bean
    public SecurityFilterChain deptSecurityFilterChain(HttpSecurity http) throws Exception {
        http
            .securityMatcher("/dept/**") // apply only to /dept URLs
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/", "/dept/login", "/dept/checkDept", "/dept/logout").permitAll()
                .requestMatchers("/dept/**").hasAuthority("DEPARTMENT")
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                .loginPage("/dept/login")
                .loginProcessingUrl("/dept/checkDept")
                .defaultSuccessUrl("/dept/dashboard", true)
                .permitAll()
            )
            .logout(logout -> logout
                .logoutUrl("/dept/logout")
                .logoutSuccessUrl("/")
                .permitAll()
            );

        return http.build();
    }
}
