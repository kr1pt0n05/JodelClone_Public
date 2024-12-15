package com.example.jodel_app.post;

import com.example.jodel_app.dto.Coordinate;
import com.example.jodel_app.dto.GetNearbyPostsRequestDTO;
import com.example.jodel_app.dto.PostDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/post")
public class PostController {

    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public String index() {
        return "posts.html";
    }

    @PostMapping("/api/create_post")
    @ResponseBody
    public ResponseEntity<?> createPost(
            @CookieValue(value = "authToken") String authToken,
            @RequestBody PostDTO postDTO) {

        return postService.createNewPost(postDTO, authToken);
    }

    @PostMapping("/api/get_nearby_posts")
    @ResponseBody
    public ResponseEntity<?> getNearbyPosts(
            @CookieValue(value = "authToken") String authToken,
            @RequestBody GetNearbyPostsRequestDTO nearbyPostsRequestDTO) {

        return postService.getPostsNearby(nearbyPostsRequestDTO, authToken);
    }


    @PostMapping("/api/get_nearby_posts/spoofing")
    @ResponseBody
    public ResponseEntity<?> getNearbyPostsSpoof(
            @CookieValue(value = "authToken") String authToken,
            @RequestBody GetNearbyPostsRequestDTO nearbyPostsRequestDTO) {

        return postService.getPostsNearby(nearbyPostsRequestDTO, authToken);
    }
}
