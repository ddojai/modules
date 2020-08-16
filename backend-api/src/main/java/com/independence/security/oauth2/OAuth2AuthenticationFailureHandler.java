package com.independence.security.oauth2;

import com.independence.util.CookieUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * OAuth2 authentication 수행중에 어떠한 error라도 발생하게되면, OAuth2AuthenticationFailureHandler가 invoke 됩니다.
 */
@Component
public class OAuth2AuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

  @Autowired
  HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;

  @Override
  public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
                                      AuthenticationException exception) throws IOException,
    ServletException {
    String targetUrl = CookieUtils.getCookie(request,
      HttpCookieOAuth2AuthorizationRequestRepository.REDIRECT_URI_PARAM_COOKIE_NAME)
      .map(Cookie::getValue)
      .orElse(("/"));

    targetUrl = UriComponentsBuilder.fromUriString(targetUrl)
      .queryParam("error", exception.getLocalizedMessage())
      .build().toUriString();

    httpCookieOAuth2AuthorizationRequestRepository.removeAuthorizationRequestCookies(request,
      response);

    getRedirectStrategy().sendRedirect(request, response, targetUrl);
  }
}
