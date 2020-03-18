package org.wooritown.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Posts extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 500, nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @ElementCollection
    private List<String> tags = new ArrayList<>();

    @Builder
    public Posts(String title, String content, List<String> tags) {
        this.title = title;
        this.content = content;
        this.tags = tags;
    }

    @ManyToOne
    @JoinColumn(name = "USER_ID", nullable = false)
    private User user;

    public void patch(Posts posts) {
        if (posts.getTitle() != null)
            this.title = posts.getTitle();
        if (posts.getContent() != null)
            this.content = posts.getContent();
        if (posts.getTags() != null)
            this.tags = posts.getTags();
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
