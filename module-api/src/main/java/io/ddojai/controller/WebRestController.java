package io.ddojai.controller;

import io.ddojai.domain.Posts;
import io.ddojai.dto.PostsMainResponseDto;
import io.ddojai.dto.PostsSaveRequestDto;
import io.ddojai.service.PostsService;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Log
@RestController
@AllArgsConstructor
public class WebRestController {

    private PostsService postsService;

    @GetMapping("/hello")
    public String hello() {
        return "HelloWorld";
    }

    @GetMapping("/")
    public ResponseEntity<List<PostsMainResponseDto>> main() {
        List<PostsMainResponseDto> posts = postsService.findAllDesc();
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @PostMapping("/posts")
    public ResponseEntity<PostsMainResponseDto> savePosts(@RequestBody PostsSaveRequestDto dto) {
        log.info("" + dto);
        Posts posts = postsService.save(dto.toEntity());
        return new ResponseEntity<>(new PostsMainResponseDto(posts), HttpStatus.CREATED);
    }
}