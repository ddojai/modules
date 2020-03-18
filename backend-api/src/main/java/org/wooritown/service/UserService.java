package org.wooritown.service;

import org.wooritown.domain.User;
import org.wooritown.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@AllArgsConstructor
@Service
public class UserService {
    private UserRepository userRepository;

    @Transactional
    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
}
