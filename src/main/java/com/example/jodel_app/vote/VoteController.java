package com.example.jodel_app.vote;

import com.example.jodel_app.dto.VoteRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/vote")
public class VoteController {
    private final VoteService voteService;

    @Autowired
    public VoteController(VoteService voteService) {
        this.voteService = voteService;
    }

    @PostMapping("/api/vote")
    @ResponseBody
    public ResponseEntity<?> setVoteOnPost(
            @CookieValue(value = "authToken") String authToken,
            @RequestBody VoteRequestDTO voteRequestDTO){
        return voteService.setVoteOnPost(authToken, voteRequestDTO);
    }
}
