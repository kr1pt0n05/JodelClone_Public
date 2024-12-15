package com.example.jodel_app.vote;

import com.example.jodel_app.comment.Comment;
import com.example.jodel_app.post.Post;
import com.example.jodel_app.user.User;
import jakarta.persistence.*;

@Entity
public class Vote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private boolean type;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false, updatable = false)
    private User user;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "entity_id", referencedColumnName = "id", nullable = true, updatable = false)
    private Votable entity;

    public boolean getType() {
        return type;
    }

    public void setType(boolean type) {
        this.type = type;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
        user.addVote(this);
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public boolean isType() {
        return type;
    }

    public Votable getEntity() {
        return entity;
    }

    public void setEntity(Votable entity) {
        this.entity = entity;
    }
}
