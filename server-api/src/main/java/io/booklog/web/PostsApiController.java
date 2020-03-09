package io.booklog.web;

import io.booklog.service.posts.PostsService;
import io.booklog.web.dto.PostsListResponseDto;
import io.booklog.web.dto.PostsResponseDto;
import io.booklog.web.dto.PostsSaveRequestDto;
import io.booklog.web.dto.PostsUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class PostsApiController {
    private final PostsService postsService;

    @PostMapping("/api/v1/posts")
    public Long save(@RequestBody PostsSaveRequestDto requestDto) {
        return postsService.save(requestDto);
    }

    @GetMapping("/api/v1/posts/{id}")
    public PostsResponseDto findById (@PathVariable Long id) {
        return postsService.findByid(id);
    }

    @GetMapping("/api/v1/posts")
    public List<PostsListResponseDto> findAllDesc () {
        return postsService.findAllDesc();
    }

    @PutMapping("/api/v1/posts/{id}")
    public Long update(@PathVariable Long id, @RequestBody PostsUpdateRequestDto requestDto) {
        return postsService.update(id, requestDto);
    }

    @DeleteMapping("/api/v1/posts/{id}")
    public Long delete(@PathVariable Long id) {
        postsService.delete(id);
        // Fix status code: 204
        return id;
    }
}
