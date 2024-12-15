package com.example.jodel_app.post;

import com.example.jodel_app.comment.Comment;
import com.example.jodel_app.user.User;
import com.example.jodel_app.vote.Type;
import com.example.jodel_app.vote.Votable;
import com.example.jodel_app.vote.Vote;
import jakarta.persistence.*;
import org.locationtech.jts.geom.Point;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@DiscriminatorValue("POST")
public class Post extends Votable {

    @Column(length = 255)
    private String content;

    private int voteCount = 0;

    private int commentCount = 0;

    @Column(nullable = false, updatable = false)
    private LocalDateTime created = LocalDateTime.now();

    @Column(columnDefinition = "GEOGRAPHY(Point, 4326)", nullable = false)
    private Point location;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false, updatable = false)
    private User user;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private Set<Comment> comments = new HashSet<>();

    @OneToMany(mappedBy = "entity", cascade = CascadeType.ALL)
    private Set<Vote> votes = new HashSet<>();

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

    @Override
    public void addVoteCount(int amount){
        this.voteCount += amount;
    }

    public LocalDateTime getCreated() {
        return created;
    }

    public void setCreated(LocalDateTime created) {
        this.created = created;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setUserPostRelationship(User user) {
        this.user = user;
        user.addPost(this);
    }

    public Set<Comment> getComments() {
        return comments;
    }

    public void setComments(Set<Comment> comments) {
        this.comments = comments;
    }

    public void addComment(Comment comment) {
        this.comments.add(comment);
    }

    public Set<Vote> getVotes() {
        return votes;
    }

    public void setVotes(Set<Vote> votes) {
        this.votes = votes;
    }

    @Override
    public void addVote(Vote vote){
        this.votes.add(vote);
    }


    public Point getLocation() {
        return location;
    }

    public void setLocation(Point location) {
        this.location = location;
    }

    public int getCommentCount() {
        return commentCount;
    }

    public void setCommentCount(int commentCount) {
        this.commentCount = commentCount;
    }

    public void incrementCommentCount(){
        this.commentCount += 1;
    }
}
