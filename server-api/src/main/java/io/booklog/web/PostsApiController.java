package io.booklog.web;

import io.booklog.domain.posts.Posts;
import io.booklog.service.posts.PostsService;
import io.booklog.web.dto.PostsListResponseDto;
import io.booklog.web.dto.PostsResponseDto;
import io.booklog.web.dto.PostsSaveRequestDto;
import io.booklog.web.dto.PostsUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<PostsListResponseDto>> findAll(@RequestParam(defaultValue = "1") String page) {
        Pageable pageable;
        try {
            pageable = PageRequest.of(Integer.parseInt(page) - 1, 10, Sort.Direction.DESC, "id");
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        Page<Posts> pagePosts = postsService.findAll(pageable);
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("Last-Page", String.valueOf(pagePosts.getTotalPages()));

        List<PostsListResponseDto> dtoList = pagePosts.map(posts -> {
            PostsListResponseDto dto = new PostsListResponseDto(posts);
            if (posts.getContent().length() >= 200) {
                StringBuilder sb = new StringBuilder(posts.getContent());
                String content = sb.substring(0, 200);
                content += "...";
                dto.setContent(content);
            }
            return dto;
        }).getContent();

        return new ResponseEntity<>(dtoList, responseHeaders, HttpStatus.OK);
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
