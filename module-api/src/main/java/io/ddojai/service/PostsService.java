package io.ddojai.service;

import io.ddojai.domain.Posts;
import io.ddojai.repository.PostsRepository;
import io.ddojai.dto.PostsMainResponseDto;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class PostsService {
    private PostsRepository postsRepository;

    @Transactional
    public Posts save(Posts posts){
        return postsRepository.save(posts);
    }

    @Transactional(readOnly = true)
    public List<PostsMainResponseDto> findAllDesc() {
        return postsRepository.findAllDesc()
                .map(PostsMainResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public Posts findById(Long id){
        return postsRepository.findById(id).orElse(null);
    }
}
