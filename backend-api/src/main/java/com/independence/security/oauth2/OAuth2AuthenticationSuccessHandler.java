package com.independence.security.oauth2;

import com.independence.exception.BadRequestException;
import com.independence.security.TokenProvider;
import com.independence.config.AppProperties;
import com.independence.util.CookieUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.Optional;

import static com.independence.security.oauth2.HttpCookieOAuth2AuthorizationRequestRepository.REDIRECT_URI_PARAM_COOKIE_NAME;

/**
 * OAuth2AuthenticationSuccessHandler는 login 성공시 invoked 됩니다.
 * redirection uri에 대한 validation을 수행합니다.
 * unauthorized redirect uri로 요청이 들어온경우, 에러가 발생합니다.
 * JWT Token을 생성합니다.
 * user를 redirect_uri로 redirect 합니다. 이때 생성한 JWT Token을 Query String으로 전달합니다
 */
@Component
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

  private TokenProvider tokenProvider;

  private AppProperties appProperties;

  private HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;


  @Autowired
  OAuth2AuthenticationSuccessHandler(TokenProvider tokenProvider, AppProperties appProperties,
                                     HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository) {
    this.tokenProvider = tokenProvider;
    this.appProperties = appProperties;
    this.httpCookieOAuth2AuthorizationRequestRepository = httpCookieOAuth2AuthorizationRequestRepository;
  }

  @Override
  public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
    String targetUrl = determineTargetUrl(request, response, authentication);

    if (response.isCommitted()) {
      logger.debug("Response has already been committed. Unable to redirect to " + targetUrl);
      return;
    }

    clearAuthenticationAttributes(request, response);
    getRedirectStrategy().sendRedirect(request, response, targetUrl);
  }

  protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
    Optional<String> redirectUri = CookieUtils.getCookie(request, REDIRECT_URI_PARAM_COOKIE_NAME)
      .map(Cookie::getValue);

    if(redirectUri.isPresent() && !isAuthorizedRedirectUri(redirectUri.get())) {
      throw new BadRequestException("Sorry! We've got an Unauthorized Redirect URI and can't proceed with the authentication");
    }

    String targetUrl = redirectUri.orElse(getDefaultTargetUrl());

    String token = tokenProvider.createToken(authentication);

    return UriComponentsBuilder.fromUriString(targetUrl)
      .queryParam("token", token)
      .build().toUriString();
  }

  protected void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {
    super.clearAuthenticationAttributes(request);
    httpCookieOAuth2AuthorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
  }

  private boolean isAuthorizedRedirectUri(String uri) {
    URI clientRedirectUri = URI.create(uri);

    return appProperties.getOauth2().getAuthorizedRedirectUris()
      .stream()
      .anyMatch(authorizedRedirectUri -> {
        // Only validate host and port. Let the clients use different paths if they want to
        URI authorizedURI = URI.create(authorizedRedirectUri);
        if(authorizedURI.getHost().equalsIgnoreCase(clientRedirectUri.getHost())
          && authorizedURI.getPort() == clientRedirectUri.getPort()) {
          return true;
        }
        return false;
      });
  }
}
