package com.example.jodel_app.dto;

import com.example.jodel_app.post.Post;
import org.locationtech.jts.geom.Point;

import com.example.jodel_app.comment.Comment;
import com.example.jodel_app.user.User;

public class CommentCreateDTO {
    private long postId;
    private String content;

    public long getPostId() {
        return postId;
    }

    public void setPostId(long postId) {
        this.postId = postId;
    }

    public String getContent() {
        return this.content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    // Convert DTO to Comment
    public Comment toComment(User user, Post post) {
        Comment comment = new Comment();
        comment.setContent(this.getContent());
        comment.setUser(user);
        comment.setPost(post);

        return comment;
    }
}
