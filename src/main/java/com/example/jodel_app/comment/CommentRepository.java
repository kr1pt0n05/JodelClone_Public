package com.example.jodel_app.comment;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    // Implement function to get all comments of a single post and sort them by
    // likes/creation
    @Query(value = "SELECT * FROM comment WHERE post_id=:postId", nativeQuery = true)
    List<Comment> findCommentsOfPost(@Param("postId") long postId);
}
