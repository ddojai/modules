package io.ddojai.controller;

import io.ddojai.dto.PostsMainResponseDto;
import io.ddojai.dto.PostsSaveRequestDto;
import io.ddojai.service.PostsService;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
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
    public List<PostsMainResponseDto> main() {
        return postsService.findAllDesc();
    }

    @PostMapping("/posts")
    public Long savePosts(@RequestBody PostsSaveRequestDto dto) {
        log.info("" + dto);
        return postsService.save(dto);
    }
}