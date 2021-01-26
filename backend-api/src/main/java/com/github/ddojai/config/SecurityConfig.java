package com.github.ddojai.config;

import com.github.ddojai.security.CustomUserDetailsService;
import com.github.ddojai.security.TokenAuthenticationFilter;
import com.github.ddojai.security.oauth2.CustomOAuth2UserService;
import com.github.ddojai.security.oauth2.HttpCookieOAuth2AuthorizationRequestRepository;
import com.github.ddojai.security.oauth2.OAuth2AuthenticationFailureHandler;
import com.github.ddojai.security.oauth2.OAuth2AuthenticationSuccessHandler;
import com.github.ddojai.security.RestAuthenticationEntryPoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
  securedEnabled = true,
  jsr250Enabled = true,
  prePostEnabled = true
)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  @Autowired
  private CustomUserDetailsService customUserDetailsService;  //인증시 사용할 custom User Service 입니다.

  @Autowired
  private CustomOAuth2UserService customOAuth2UserService;

  @Autowired
  private OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;

  @Autowired
  private OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;

  @Autowired
  private HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;

  @Bean
  public TokenAuthenticationFilter tokenAuthenticationFilter() {
    // 로그인시 JWT Token을 확인해 인가된 사용자 유무를 판별하고 내부 process를 수행합니다.
    return new TokenAuthenticationFilter();
  }

  /*
    By default, Spring OAuth2 uses HttpSessionOAuth2AuthorizationRequestRepository to save
    the authorization request. But, since our service is stateless, we can't save it in
    the session. We'll save the request in a Base64 encoded cookie instead.
  */
  @Bean
  public HttpCookieOAuth2AuthorizationRequestRepository cookieAuthorizationRequestRepository() {
    return new HttpCookieOAuth2AuthorizationRequestRepository();
  }

  @Override
  public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
    authenticationManagerBuilder
      .userDetailsService(customUserDetailsService)
      .passwordEncoder(passwordEncoder());
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }


  @Bean(BeanIds.AUTHENTICATION_MANAGER)
  @Override
  public AuthenticationManager authenticationManagerBean() throws Exception {
    return super.authenticationManagerBean();
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
      .cors()
      .and()
      .sessionManagement()
      .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
      .and()
      .csrf()
      .disable()
      .formLogin()
      .disable()
      .httpBasic()
      .disable()
      .exceptionHandling()
      .authenticationEntryPoint(new RestAuthenticationEntryPoint()) // authentication 없이 접근하는 경우
      .and()
      .authorizeRequests()  // URL 별 권한 관리를 설정하는 옵션의 시작점. 선언되야 antMatchers 옵션 사용 가능
      .antMatchers("/", // 권한 관리 대상을 지정하는 옵션. URL, HTTP 메소드 별로 관리 가능
        "/error",
        "/favicon.ico",
        "/**/*.png",
        "/**/*.gif",
        "/**/*.svg",
        "/**/*.jpg",
        "/**/*.html",
        "/**/*.css",
        "/**/*.js")
      .permitAll()
      .antMatchers("/auth/**", "/oauth2/**")
      .permitAll()
      .anyRequest()
      .authenticated()  // 설정된 값들 이외 나머지 URL들은 모두 인증된 사용자들에게만 허용
      .and()
      .oauth2Login()  // OAuth2 로그인 기능에 대한 여러 설정의 진입점.
      .authorizationEndpoint() // oauth 로그인시 접근할 end point를 정의합니다
      .baseUri("/oauth2/authorize")
      .authorizationRequestRepository(cookieAuthorizationRequestRepository())
      .and()
      .userInfoEndpoint() // Oauth2 로그인 성공 이후 사용자 정보를 가져올 때의 설정들을 담당
      .userService(customOAuth2UserService) // 소셜 로그인 성공 시 후속 조치를 진행할 UserService 인터페이스의 구현체를 등록.
      .and()
      .successHandler(oAuth2AuthenticationSuccessHandler) // 로그인 성공시 invoke 할 Handler를 정의합니다.
      .failureHandler(oAuth2AuthenticationFailureHandler); // 로그인 실패시 invoke 할 Handler를 정의합니다.

    // Add our custom Token based authentication filter
    // reqeust 요청이 올때마다 UsernamePasswordAuthenticationFilter 이전에 tokenAuthenticaitonFilter를 수행하도록
    // 정의합니다.
    http.addFilterBefore(tokenAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
  }
}
