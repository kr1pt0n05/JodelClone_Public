package com.example.jodel_app.comment;

import com.example.jodel_app.post.Post;
import com.example.jodel_app.user.User;
import com.example.jodel_app.vote.Votable;
import com.example.jodel_app.vote.Vote;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@DiscriminatorValue("COMMENT")
public class Comment extends Votable {

    @Column(length = 255)
    private String content;

    private int voteCount = 0;

    @Column(nullable = false, updatable = false)
    private LocalDateTime created = LocalDateTime.now();

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false, updatable = false)
    private User user;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "post_id", referencedColumnName = "id", nullable = false, updatable = false)
    private Post post;

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

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public Set<Vote> getVotes() {
        return votes;
    }

    public void setVotes(Set<Vote> votes) {
        this.votes = votes;
    }

    @Override
    public void addVoteCount(int amount) {
        this.voteCount += amount;
    }

    @Override
    public void addVote(Vote vote) {
        this.votes.add(vote);
    }
}
