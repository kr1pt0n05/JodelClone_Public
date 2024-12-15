package com.example.jodel_app.post;

import com.example.jodel_app.dto.Coordinate;
import com.example.jodel_app.dto.GetNearbyPostsRequestDTO;
import com.example.jodel_app.dto.PostResponseDTO;
import com.example.jodel_app.user.User;
import com.example.jodel_app.user.UserRepository;
import com.example.jodel_app.dto.PostDTO;
import com.example.jodel_app.utils.CookieExtractUsername;
import com.example.jodel_app.vote.Type;
import com.example.jodel_app.vote.Vote;
import com.example.jodel_app.vote.VoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class PostService {
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final VoteRepository voteRepository;

    @Autowired
    public PostService(UserRepository userRepository, PostRepository postRepository, VoteRepository voteRepository) {
        this.userRepository = userRepository;
        this.postRepository = postRepository;
        this.voteRepository = voteRepository;
    }

    /**
     * Creates a new post.
     *
     * @param postDTO the PostDTO containing the data to create the post
     * @param authToken the authentication token to extract the username
     * @return a ResponseEntity containing the status of the creation process
     */
    public ResponseEntity<?> createNewPost(PostDTO postDTO, String authToken) {
        try {
            Post post = postDTO.toPost();
            String username = CookieExtractUsername.extractUsername(authToken);
            Optional<User> user_opt = userRepository.findByUsername(username);

            if (user_opt.isPresent() && post != null) {
                User user = user_opt.get();
                user.addPost(post);
                post.setUser(user);

                postRepository.save(post);
                return new ResponseEntity<>(Map.of(
                        "message", "Success."),
                        HttpStatusCode.valueOf(200));

            } else {
                return new ResponseEntity<>(Map.of(
                        "message", "Couldn't create new Post!"),
                        HttpStatusCode.valueOf(400));
            }

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(Map.of(
                    "message", "Couldn't create new Post!"),
                    HttpStatusCode.valueOf(400));
        }
    }


    /**
     * Fetches posts that are nearby based on the user's location and filters.
     * Possible filters: ActivityFilterType and DatetimeFilterType.
     *
     * ActivityFilterType: NEWEST, MOST_COMMENTED, LOUDEST.
     * DatetimeFilterType: NOW, TODAY, WEEK.
     *
     * @param postDTO the request DTO containing the filter parameters and coordinates of the user
     * @param authToken the authentication token to extract the username
     * @return a ResponseEntity containing the filtered list of posts
     */
    public ResponseEntity<?> getPostsNearby(GetNearbyPostsRequestDTO postDTO, String authToken) {
        try {
            // Extract username from the authToken
            String username = CookieExtractUsername.extractUsername(authToken);
            User user = userRepository.findByUsername(username).get();

            // Arguments for filtering Posts by location and date.
            double longitude = postDTO.getCoordinates().getLongitude();
            double latitude = postDTO.getCoordinates().getLatitude();
            final double RADIUS = 10000; // In meters
            LocalDateTime now = LocalDateTime.now();
            LocalDateTime then = null;

            // Depending on the user's selected time filter, adjust the `then` variable
            switch (postDTO.getDatetimeFilterType()){
                case NOW -> then = now.minusMinutes(15); // Time frame for "Now" filter: [15 minutes ago UNTIL now]
                case TODAY -> then = LocalDate.now().atStartOfDay(); // Time frame for "Today" filter: [Start of day UNTIL now]
                case WEEK -> then = LocalDate.now().minusDays(7).atStartOfDay(); // Time frame for "Week" filter: [Start of 7 days ago
            }

            // List to store nearby posts based on activity filter type
            List<Post> nearbyPosts = null;

            // Switch based on activity filter type, and query for posts accordingly
            switch (postDTO.getActivityFilterType()){
                case NEWEST -> nearbyPosts = postRepository.findPostsNearbyAndFilterByNewest(
                        longitude, latitude, RADIUS, then, now); // Query for newest posts

                case MOST_COMMENTED ->  nearbyPosts = postRepository.findPostsNearbyAndFilterByComments(
                        longitude, latitude, RADIUS, then, now); // Query for most commented posts

                case LOUDEST -> nearbyPosts = postRepository.findPostsNearbyAndFilterByLoudest(
                        longitude, latitude, RADIUS, then, now); // Query for loudest posts (most likes)
            }

            // For each post, check if the user has voted, and set the vote status (like, dislike, or no vote)
            nearbyPosts.forEach((post -> {
                Optional<Vote> vote_opt = voteRepository.findByUserAndEntity(user, post);

                // If the user has voted, set the vote status accordingly
                if(vote_opt.isPresent()){
                    Vote vote = vote_opt.get();
                    if (vote.getType()) {   // If vote type is true (like), set the post's vote status to LIKE
                        post.setVoteStatus(Type.LIKE);
                    } else {                // If vote type is false (dislike), set the post's vote status to DISLIKE
                        post.setVoteStatus(Type.DISLIKE);
                    }
                }
            }));

            // Convert Posts to DTO
            List<PostResponseDTO> nearbyPostsDTO = PostResponseDTO.convertPostsToDTOs(nearbyPosts);

            return new ResponseEntity<>(Map.of(
                    "message", "Success.",
                    "posts", nearbyPostsDTO.toArray()),
                    HttpStatusCode.valueOf(200));

        } catch (Exception e) {
            System.out.println(e.getMessage());
            System.out.println(Arrays.toString(e.getStackTrace()));
            return new ResponseEntity<>(Map.of(
                    "message", "Couldn't fetch Posts!"),
                    HttpStatusCode.valueOf(400));
        }
    }

}
