package io.ddojai.repository;

import io.ddojai.domain.Posts;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PostsRepository extends JpaRepository<Posts, Long> {
    @Query("SELECT s FROM Posts s JOIN s.tags t WHERE t = LOWER(:tag)")
    Page<Posts> retrieveByTag(@Param("tag") String tag, Pageable pageable);
}
