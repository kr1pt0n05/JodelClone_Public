package com.example.jodel_app.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.example.jodel_app.comment.Comment;
import com.example.jodel_app.vote.Type;

public class CommentResponseDTO {
    private String content;
    private int voteCount;
    private LocalDateTime created;
    private long id;
    private Type voteStatus = Type.NO_VOTE;

    public CommentResponseDTO(String content, LocalDateTime created, int voteCount, long id, Type voteStatus) {
        this.content = content;
        this.created = created;
        this.voteCount = voteCount;
        this.id = id;
        this.voteStatus = voteStatus;
    }

    public static List<CommentResponseDTO> convertCommentsToDTOs(List<Comment> comments) {
        return comments.stream()
                .map(comment -> new CommentResponseDTO(comment.getContent(), comment.getCreated(),
                        comment.getVoteCount(), comment.getId(), comment.getVoteStatus()))
                .collect(Collectors.toList());
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getVoteCount() {
        return voteCount;
    }

    public void setVoteCount(int voteCount) {
        this.voteCount = voteCount;
    }

    public LocalDateTime getCreated() {
        return created;
    }

    public void setCreated(LocalDateTime created) {
        this.created = created;
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
}
