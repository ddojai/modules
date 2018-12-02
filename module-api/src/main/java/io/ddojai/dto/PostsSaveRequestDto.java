package io.ddojai.dto;

import io.ddojai.domain.Posts;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class PostsSaveRequestDto {

    private String title;
    private String content;
    private List<String> tags;

    @Builder
    public PostsSaveRequestDto(String title, String content, List<String> tags) {
        this.title = title;
        this.content = content;
        this.tags = tags;
    }

    public Posts toEntity() {
        return Posts.builder()
                .title(title)
                .content(content)
                .tags(tags)
                .build();
    }
}