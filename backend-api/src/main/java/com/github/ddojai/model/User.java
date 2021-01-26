package com.github.ddojai.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "users", uniqueConstraints = {
  @UniqueConstraint(columnNames = "email")
})
public class User extends BaseTimeEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String name;

  @Email
  @Column(nullable = false)
  private String email;

  @Column(length = 512)
  private String imageUrl;

  @Column(nullable = false)
  private Boolean emailVerified = false;

  @JsonIgnore
  private String password;

  @NotNull
  @Enumerated(EnumType.STRING)
  private AuthProvider provider;

  private String providerId;

  @Builder
  public User(String name, String email, AuthProvider provider, String providerId, String imageUrl
    , String password) {
    this.name = name;
    this.email = email;
    this.provider = provider;
    this.providerId = providerId;
    this.imageUrl = imageUrl;
    this.password = password;
  }

  public User update(String name, String imageUrl) {
    this.name = name;
    this.imageUrl = imageUrl;

    return this;
  }
}
