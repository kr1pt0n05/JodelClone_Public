package com.example.jodel_app.vote;

import com.example.jodel_app.comment.Comment;
import com.example.jodel_app.post.Post;
import com.example.jodel_app.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.parser.Entity;
import java.util.Optional;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {

    // Implement function to retrieve all votes for a post.

    // Implement function to retrieve all votes for a Comment.

    // Returns an instance if user has already voted on given post
    Optional<Vote> findByUserAndEntity(User user, Votable entity);
}
