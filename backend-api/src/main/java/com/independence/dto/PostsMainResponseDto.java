package com.independence.dto;

import com.independence.domain.User;
import com.independence.domain.Posts;
import lombok.Getter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Getter
public class PostsMainResponseDto {
    private Long id;
    private String title;
    private String content;
    private List<String> tags;
    private User user;
    private String createdDate;

    public PostsMainResponseDto(Posts entity) {
        id = entity.getId();
        title = entity.getTitle();
        content = entity.getContent();
        tags = entity.getTags();
        user = entity.getUser();
        createdDate = toStringDateTime(entity.getCreatedDate());
    }

    private String toStringDateTime(LocalDateTime localDateTime) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return Optional.ofNullable(localDateTime)
                .map(formatter::format)
                .orElse("");
    }
}
