package io.ddojai.controller;

import io.ddojai.domain.Posts;
import io.ddojai.dto.PostsMainResponseDto;
import io.ddojai.dto.PostsSaveRequestDto;
import io.ddojai.service.PostsService;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/*")
@AllArgsConstructor
@Log
public class PostsRestController {

    private PostsService postsService;

    @GetMapping("/posts")
    public ResponseEntity<Page<PostsMainResponseDto>> list(@RequestParam(defaultValue = "1") String page) {
        Pageable pageable;
        try {
            pageable = PageRequest.of(Integer.parseInt(page) - 1, 10, Sort.Direction.DESC, "id");
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        Page<Posts> pagePosts = postsService.findAll(pageable);

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("Last-Page", String.valueOf(pagePosts.getTotalPages()));

        return new ResponseEntity<>(pagePosts.map(PostsMainResponseDto::new), responseHeaders, HttpStatus.OK);
    }

    @GetMapping("/posts/{id}")
    public ResponseEntity<PostsMainResponseDto> read(@PathVariable("id") Long id) {
        log.info("read id: " + id);
        Posts posts = postsService.findById(id);
        if (posts == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(new PostsMainResponseDto(posts), HttpStatus.OK);
    }

    @PostMapping("/posts")
    public ResponseEntity<PostsMainResponseDto> write(@RequestBody @Valid PostsSaveRequestDto dto) {
        log.info("write dto :" + dto);

        Posts posts = postsService.save(dto.toEntity());
        return new ResponseEntity<>(new PostsMainResponseDto(posts), HttpStatus.CREATED);
    }

    @DeleteMapping("/posts/{id}")
    public ResponseEntity<Object> remove(@PathVariable("id") Long id) {
        log.info("remove id: " + id);
        try {
            postsService.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/posts/{id}")
    public ResponseEntity<PostsMainResponseDto> update(@PathVariable("id") Long id, @RequestBody PostsSaveRequestDto dto) {
        log.info("patch dto :" + dto);

        Posts posts = postsService.patch(id, dto.toEntity());
        if (posts == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(new PostsMainResponseDto(posts), HttpStatus.OK);
    }

}