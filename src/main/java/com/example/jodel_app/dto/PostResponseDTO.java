package com.example.jodel_app.dto;

import com.example.jodel_app.post.Post;
import com.example.jodel_app.vote.Type;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class PostResponseDTO {
    private String content;
    private LocalDateTime created;
    private int voteCount;
    private int commentCount;
    private long id;
    private Type voteStatus = Type.NO_VOTE;

    public PostResponseDTO(String content, LocalDateTime created, int voteCount, int commentCount, long id, Type voteStatus) {
        this.content = content;
        this.created = created;
        this.voteCount = voteCount;
        this.commentCount = commentCount;
        this.id = id;
        this.voteStatus = voteStatus;
    }

    public static List<PostResponseDTO> convertPostsToDTOs(List<Post> posts) {
        return posts.stream()
                .map(post -> new PostResponseDTO(post.getContent(), post.getCreated(), post.getVoteCount(),
                        post.getCommentCount(), post.getId(), post.getVoteStatus()))
                .collect(Collectors.toList());
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getCreated() {
        return created;
    }

    public void setCreated(LocalDateTime created) {
        this.created = created;
    }

    public int getVoteCount() {
        return voteCount;
    }

    public void setVoteCount(int voteCount) {
        this.voteCount = voteCount;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
    public Type getVoteStatus() {
        return voteStatus;
    }

    public void setVoteStatus(Type voteStatus) {
        this.voteStatus = voteStatus;
    }

    public int getCommentCount() {
        return commentCount;
    }

    public void setCommentCount(int commentCount) {
        this.commentCount = commentCount;
    }
}
