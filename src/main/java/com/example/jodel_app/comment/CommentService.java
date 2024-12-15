package com.example.jodel_app.comment;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.example.jodel_app.post.Post;
import com.example.jodel_app.post.PostRepository;
import com.example.jodel_app.vote.Type;
import com.example.jodel_app.vote.Vote;
import com.example.jodel_app.vote.VoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.jodel_app.dto.CommentCreateDTO;
import com.example.jodel_app.dto.CommentResponseDTO;
import com.example.jodel_app.user.User;
import com.example.jodel_app.user.UserRepository;
import com.example.jodel_app.utils.CookieExtractUsername;

@Service
public class CommentService {

    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final VoteRepository voteRepository;

    @Autowired
    public CommentService(UserRepository userRepository, CommentRepository commentRepository, PostRepository postRepository, VoteRepository voteRepository) {
        this.userRepository = userRepository;
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
        this.voteRepository = voteRepository;
    }

    public ResponseEntity<?> getComments(long postId, String authToken) {
        try {
            String username = CookieExtractUsername.extractUsername(authToken);

            User user = userRepository.findByUsername(username).get();
            List<Comment> comments = commentRepository.findCommentsOfPost(postId);

            // Checking for user votes on every comment
            // if the user has voted, set voteStatus to either LIKE or DISLIKE
            // otherwise voteStatus will default to NO_VOTE
            comments.forEach((comment -> {
                Optional<Vote> vote_opt = voteRepository.findByUserAndEntity(user, comment);

                if(vote_opt.isPresent()){
                    Vote vote = vote_opt.get();
                    if (vote.getType()) {
                        comment.setVoteStatus(Type.LIKE);
                    } else {
                        comment.setVoteStatus(Type.DISLIKE);
                    }
                }
            }));

            // Convert Comments to DTO to only provide content, vote count and time of
            // creation
            // to frontend
            List<CommentResponseDTO> commentResponseDTO = CommentResponseDTO.convertCommentsToDTOs(comments);

            return new ResponseEntity<>(Map.of(
                    "message", "Success.",
                    "comments", commentResponseDTO.toArray()),
                    HttpStatusCode.valueOf(200));

        } catch (Exception e) {
            return new ResponseEntity<>(Map.of(
                    "message", "Couldn't fetch Comments!"),
                    HttpStatusCode.valueOf(400));
        }
    }

    public ResponseEntity<?> createNewComment(CommentCreateDTO commentDTO, String authToken) {
        try {
            String username = CookieExtractUsername.extractUsername(authToken);
            Optional<User> user_opt = userRepository.findByUsername(username);
            Optional<Post> post_opt = postRepository.findById(commentDTO.getPostId());

            if (user_opt.isPresent() && post_opt.isPresent()) {
                User user = user_opt.get();
                Post post = post_opt.get();

                Comment comment = commentDTO.toComment(user, post);
                user.addComment(comment);
                post.addComment(comment);
                post.incrementCommentCount();
                commentRepository.save(comment);

                return new ResponseEntity<>(Map.of(
                        "message", "Success."),
                        HttpStatusCode.valueOf(200));

            } else {
                return new ResponseEntity<>(Map.of(
                        "message", "Couldn't create new Comment!"),
                        HttpStatusCode.valueOf(400));
            }

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(Map.of(
                    "message", "Couldn't create new Comment!"),
                    HttpStatusCode.valueOf(500));
        }
    }
}
