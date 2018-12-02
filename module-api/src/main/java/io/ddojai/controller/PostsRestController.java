package io.ddojai.controller;

import io.ddojai.domain.Posts;
import io.ddojai.dto.PostsMainResponseDto;
import io.ddojai.dto.PostsSaveRequestDto;
import io.ddojai.service.PostsService;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/*")
@AllArgsConstructor
@Log
public class PostsRestController {

    private PostsService postsService;

    @GetMapping("/posts")
    public ResponseEntity<List<PostsMainResponseDto>> list() {
        List<PostsMainResponseDto> posts = postsService.findAllDesc();
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @GetMapping("/posts/{id}")
    public ResponseEntity<PostsMainResponseDto> read(@PathVariable("id")Long id) throws ClassNotFoundException {
        log.info("id: " + id);
        Posts posts = postsService.findById(id);
        if (posts == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(new PostsMainResponseDto(posts), HttpStatus.OK);
    }

    @PostMapping("/posts")
    public ResponseEntity<PostsMainResponseDto> write(@RequestBody PostsSaveRequestDto dto) {
        log.info("" + dto);
        Posts posts = postsService.save(dto.toEntity());
        return new ResponseEntity<>(new PostsMainResponseDto(posts), HttpStatus.CREATED);
    }
}