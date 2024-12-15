package com.example.jodel_app.dto;

import com.example.jodel_app.vote.EntityType;
import com.example.jodel_app.user.User;
import com.example.jodel_app.vote.Votable;
import com.example.jodel_app.vote.Vote;

public class VoteRequestDTO {
    private long id;
    private boolean voteType;
    private EntityType entityType;

    public Vote toVote(User user, Votable entity){
        Vote vote = new Vote();
        vote.setType(voteType);
        vote.setUser(user);
        vote.setEntity(entity);

        return vote;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public boolean getVoteType() {
        return voteType;
    }

    public void setVoteType(boolean voteType) {
        this.voteType = voteType;
    }

    public EntityType getEntityType() {
        return entityType;
    }

    public void setEntityType(EntityType entityType) {
        this.entityType = entityType;
    }
}
