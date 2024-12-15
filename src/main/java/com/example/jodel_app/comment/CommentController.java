package com.example.jodel_app.comment;

import com.example.jodel_app.dto.CommentCreateDTO;
import com.example.jodel_app.dto.CommentRequestDTO;
import com.example.jodel_app.dto.CommentResponseDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/comment")
public class CommentController {
    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/api/create_comment")
    @ResponseBody
    public ResponseEntity<?> createComment(
            @CookieValue(value = "authToken") String authToken,
            @RequestBody CommentCreateDTO commentDTO) {
        return commentService.createNewComment(commentDTO, authToken);
    }

    @PostMapping("/api/get_comments")
    @ResponseBody
    public ResponseEntity<?> getComments(
            @CookieValue(value = "authToken") String authToken,
            @RequestBody CommentRequestDTO commentRequestDTO) {
        return commentService.getComments(commentRequestDTO.getPostId(), authToken);
    }
}
