package io.ddojai.service;

import io.ddojai.domain.Posts;
import io.ddojai.repository.PostsRepository;
import io.ddojai.dto.PostsMainResponseDto;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
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

    @Transactional
    public void deleteById(Long id){
        postsRepository.deleteById(id);
    }


    @Transactional
    public Posts patch(Long id, Posts posts) {
        Optional<Posts> optionalPosts = postsRepository.findById(id);
        if (optionalPosts.isPresent()) {
            Posts patchedPosts = optionalPosts.get();
            patchedPosts.patch(posts);
            return postsRepository.save(patchedPosts);
        }
        return null;
    }

}
