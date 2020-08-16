package com.independence.controller;

import com.independence.repository.UserRepository;
import com.independence.model.User;
import com.independence.exception.ResourceNotFoundException;
import com.independence.security.CurrentUser;
import com.independence.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

  @Autowired
  private UserRepository userRepository;

  @GetMapping("/user/me")
  @PreAuthorize("hasRole('USER')")
  public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
    return userRepository.findById(userPrincipal.getId())
      .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
  }
}
