package com.example.jodel_app.vote;

import com.example.jodel_app.comment.Comment;
import com.example.jodel_app.comment.CommentRepository;
import com.example.jodel_app.dto.VoteRequestDTO;
import com.example.jodel_app.post.Post;
import com.example.jodel_app.post.PostRepository;
import com.example.jodel_app.user.User;
import com.example.jodel_app.user.UserRepository;
import com.example.jodel_app.utils.CookieExtractUsername;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Map;
import java.util.Optional;

@Service
public class VoteService {
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final VoteRepository voteRepository;

    @Autowired
    public VoteService(UserRepository userRepository, PostRepository postRepository, CommentRepository commentRepository, VoteRepository voteRepository) {
        this.userRepository = userRepository;
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
        this.voteRepository = voteRepository;
    }


    public ResponseEntity<?> setVoteOnPost(String authToken, VoteRequestDTO voteRequestDTO) {
        try {
            String username = CookieExtractUsername.extractUsername(authToken);
            User user = userRepository.findByUsername(username).get();

            long id = voteRequestDTO.getId();
            Votable entity = null;

            switch (voteRequestDTO.getEntityType()) {
                case POST -> entity = postRepository.findById(id).get();
                case COMMENT -> entity = commentRepository.findById(id).get();
            }

            System.out.println("Before vote_opt empty");
            // check if user already voted on that entity
            Optional<Vote> vote_opt = voteRepository.findByUserAndEntity(user, entity);
            System.out.println("After vote_opt empty");

            // set vote if not
            if (vote_opt.isEmpty()) {
                System.out.println("#1");
                // vote does not exist: Create one
                Vote vote = voteRequestDTO.toVote(user, entity);
                System.out.println("#2");
                user.addVote(vote);
                System.out.println("#3");
                entity.addVote(vote);
                System.out.println("#4");
                // if user has liked: increment vote count of post
                // else decrement vote count of post
                if (voteRequestDTO.getVoteType()) {
                    System.out.println("#5");
                    entity.addVoteCount(1);
                    System.out.println("#6");
                } else {
                    entity.addVoteCount(-1);
                }
                System.out.println("#7");
                voteRepository.save(vote);
                System.out.println("#8");

            } else {
                // vote does exist: Check if it is liked or disliked
                Vote vote = vote_opt.get();
                if (voteRequestDTO.getVoteType() == vote.getType()) {
                    // user has removed like or dislike: Remove Vote
                    if (vote.getType()) {
                        entity.addVoteCount(-1);
                    } else {
                        entity.addVoteCount(1);
                    }
                    voteRepository.delete(vote);

                } else if (voteRequestDTO.getVoteType()) {
                    // user changed from dislike to like: Increment voteCount by 2
                    entity.addVoteCount(2);
                    vote.setType(true);
                    voteRepository.save(vote);

                } else {
                    // user changed from like to dislike: Decrement voteCount by 2
                    entity.addVoteCount(-2);
                    vote.setType(false);
                    voteRepository.save(vote);
                }
            }

            return new ResponseEntity<>(Map.of(
                    "message", "Success."),
                    HttpStatusCode.valueOf(200));

        }catch (Exception e){
            System.out.println(e.getMessage());
            System.out.println(Arrays.toString(e.getStackTrace()));
            return new ResponseEntity<>(Map.of(
                    "message", "Internal Server error."),
                    HttpStatusCode.valueOf(500));
        }
    }
}
