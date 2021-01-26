package com.github.ddojai.controller;

import com.github.ddojai.model.AuthProvider;
import com.github.ddojai.model.User;
import com.github.ddojai.payload.ApiResponse;
import com.github.ddojai.payload.AuthResponse;
import com.github.ddojai.payload.LoginRequest;
import com.github.ddojai.payload.SignUpRequest;
import com.github.ddojai.repository.UserRepository;
import com.github.ddojai.security.TokenProvider;
import com.github.ddojai.exception.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/auth")
public class AuthController {
  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private TokenProvider tokenProvider;

  @PostMapping("/login")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
    Authentication authentication = authenticationManager.authenticate(
      new UsernamePasswordAuthenticationToken(
        loginRequest.getEmail(),
        loginRequest.getPassword()
      )
    );

    SecurityContextHolder.getContext().setAuthentication(authentication);

    String token = tokenProvider.createToken(authentication);
    return ResponseEntity.ok(new AuthResponse(token));
  }

  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      throw new BadRequestException("Email address already in use.");
    }

    // Creating user's account
    User user = User.builder()
      .name(signUpRequest.getName())
      .email(signUpRequest.getEmail())
      .provider(AuthProvider.local)
      .password(passwordEncoder.encode(signUpRequest.getPassword()))
      .build();

    User result = userRepository.save(user);

    URI location = ServletUriComponentsBuilder
      .fromCurrentContextPath().path("/user/me")
      .buildAndExpand(result.getId()).toUri();

    return ResponseEntity.created(location)
      .body(new ApiResponse(true, "User registered successfully@"));
  }
}
