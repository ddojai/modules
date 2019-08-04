package io.ddojai.service;

import io.ddojai.domain.Posts;
import io.ddojai.repository.PostsRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@AllArgsConstructor
@Service
public class PostsService {
    private PostsRepository postsRepository;

    @Transactional
    public Posts save(Posts posts){
        return postsRepository.save(posts);
    }

    @Transactional(readOnly = true)
    public Page<Posts> findAll(Pageable page) {
        return postsRepository.findAll(page);
    }

    @Transactional(readOnly = true)
    public Page<Posts> retrieveByTag(String tag, Pageable page) {
        return postsRepository.retrieveByTag(tag, page);
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
