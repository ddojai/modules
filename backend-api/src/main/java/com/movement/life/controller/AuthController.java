package com.movement.life.controller;

import com.movement.life.exception.BadRequestException;
import com.movement.life.model.AuthProvider;
import com.movement.life.model.User;
import com.movement.life.payload.ApiResponse;
import com.movement.life.payload.AuthResponse;
import com.movement.life.payload.LoginRequest;
import com.movement.life.payload.SignUpRequest;
import com.movement.life.repository.UserRepository;
import com.movement.life.security.TokenProvider;
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
