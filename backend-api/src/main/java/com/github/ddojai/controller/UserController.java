package com.github.ddojai.controller;

import com.github.ddojai.exception.ResourceNotFoundException;
import com.github.ddojai.model.User;
import com.github.ddojai.repository.UserRepository;
import com.github.ddojai.security.CurrentUser;
import com.github.ddojai.security.UserPrincipal;
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
