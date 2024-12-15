package com.example.jodel_app.vote;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "entity_type", discriminatorType = DiscriminatorType.STRING)
public abstract class Votable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Transient // Should not be persisted, since this is determined at runtime (When fetching nearbyPosts)
    private Type voteStatus = Type.NO_VOTE;

    public abstract void addVoteCount(int amount);
    public abstract void addVote(Vote vote);

    public long getId() {
        return id;
    }

    public Type getVoteStatus() {
        return voteStatus;
    }

    public void setVoteStatus(Type voteStatus) {
        this.voteStatus = voteStatus;
    }
}
