package com.example.jodel_app.user;

import com.example.jodel_app.comment.Comment;
import com.example.jodel_app.post.Post;
import com.example.jodel_app.vote.Vote;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "jodel_user") // Table name needed, since it would default to "user", which is a reserved
                            // keyword in PostgreSQL.
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(length = 64, unique = true, nullable = false)
    @JsonProperty("username")
    private String username;

    @Column(length = 64, nullable = false)
    @JsonProperty("password")
    private String password;

    // note: OneToMany relations only retrieved, when implicitly calling them. E.g.
    // via getPosts()
    // standard fetch = lazy
    @OneToMany(mappedBy = "user", cascade = CascadeType.MERGE)
    private Set<Post> posts = new HashSet<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.MERGE)
    private Set<Comment> comments = new HashSet<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.MERGE)
    private Set<Vote> votes = new HashSet<>();

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Post> getPosts() {
        return posts;
    }

    public void setPosts(Set<Post> posts) {
        this.posts = posts;
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

    public void addPost(Post post) {
        this.posts.add(post);
    }

    public void addVote(Vote vote) {
        this.votes.add(vote);
    }

    public void addPostUserRelationship(Post post) {
        this.posts.add(post);
        post.setUser(this);
    }
}
