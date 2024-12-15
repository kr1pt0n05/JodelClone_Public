package com.example.jodel_app.utils;

import com.example.jodel_app.comment.CommentRepository;
import com.example.jodel_app.dto.CommentCreateDTO;
import com.example.jodel_app.dto.PostDTO;
import com.example.jodel_app.post.Post;
import com.example.jodel_app.post.PostRepository;
import com.example.jodel_app.user.User;
import com.example.jodel_app.user.UserRepository;
import com.example.jodel_app.comment.Comment;
import com.example.jodel_app.vote.Vote;
import com.example.jodel_app.vote.VoteRepository;
import org.geolatte.geom.V;
import org.hibernate.Hibernate;
import org.locationtech.jts.geom.GeometryFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Configuration
public class TestData {
    private final GeometryFactory geometryFactory = new GeometryFactory();

    private String hashPassword(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hashedBytes = md.digest(password.getBytes());
            return Base64.getEncoder().encodeToString(hashedBytes);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error hashing password", e);
        }
    }

    @Bean
    public CommandLineRunner generateTestRooms(PostRepository postRepository, UserRepository userRepository, CommentRepository commentRepository, VoteRepository voteRepository) {
        return args -> {
            Random random = new Random();

            User user = new User();
            user.setUsername("123456");
            user.setPassword(hashPassword("123456"));
            userRepository.save(user);

            User created_user = userRepository.findByUsername("123456").get();

            List<String> comments = Arrays.asList(
                    "I can't believe how fast the weather changed today!",
                    "Does anyone know a good place to get coffee in the city center?",
                    "I tried that new burger joint, and it was AMAZING. Highly recommend it!",
                    "I swear, my cat is smarter than I am sometimes.",
                    "Why does it always seem to rain on the weekends?",
                    "I finally managed to catch up on that Netflix series I've been meaning to watch!",
                    "Can anyone recommend a good workout routine for beginners?",
                    "Is it just me, or does time feel like it's moving faster as I get older?",
                    "Anyone else feel like the traffic is getting worse every day?",
                    "I love how quiet the city is at night, it's so peaceful.",
                    "Does anyone else have a hard time falling asleep lately?",
                    "I can't believe how much I miss going to the beach. Need a vacation!",
                    "I tried baking for the first time today and it turned out surprisingly well!",
                    "What's the best way to stay productive while working from home?",
                    "Anyone else feel like the holiday season came up way too fast this year?",
                    "I really need to get back into reading books again, it's been too long.",
                    "Just had the best pizza of my life. I think I'm in heaven.",
                    "I've been getting really into photography lately. Any tips?",
                    "The sunset was absolutely gorgeous tonight, felt so peaceful watching it.",
                    "Anyone have any tips for keeping houseplants alive? I keep killing mine!",
                    "Microservices are great, but they introduce a lot of complexity with inter-service communication.",
                    "I prefer monolithic architectures for smaller teams. It’s simpler to manage and easier to debug.",
                    "Event-driven architecture can be powerful, but managing state and consistency across services is a challenge.",
                    "I’ve been experimenting with CQRS in our architecture. It simplifies command/query separation but can lead to complex data models.",
                    "I think serverless architecture is the future, but the cold start times can be a real issue for certain use cases.",
                    "The 12-factor app methodology is great for building scalable cloud-native applications, but it requires strict discipline.",
                    "Decentralized data management in microservices leads to eventual consistency, which is hard to deal with in complex systems.",
                    "I’m not sure about GraphQL as a replacement for REST. It offers flexibility, but can it scale for larger applications?",
                    "The layered architecture pattern is still my go-to for clear separation of concerns and maintainability.",
                    "I’ve been working on a hexagonal architecture (ports and adapters). It helps decouple business logic from external systems, but it’s a hard sell to non-technical stakeholders.",
                    "I’m seeing more and more adoption of event sourcing in our projects, and it’s definitely a powerful tool, but it’s tricky to implement correctly.",
                    "Service meshes, like Istio, help with observability and security in microservices, but they add another layer of complexity.",
                    "The shift towards domain-driven design has made our team more focused on the problem space, but it requires deep collaboration between developers and business experts.",
                    "I’ve had some success using the repository pattern to abstract database interactions. It makes the application more testable and decouples it from the persistence layer.",
                    "We’ve adopted a hybrid architecture that combines both REST APIs and gRPC. It works well for different types of clients and services, but we’re managing two different protocols.",
                    "Our architecture uses the Singleton pattern for certain configurations, but I’m beginning to wonder if it introduces more global state than is necessary.",
                    "I’m skeptical about using NoSQL databases in certain cases. They scale well, but they can be hard to query and lack strong consistency guarantees.",
                    "The biggest challenge in a microservices architecture is managing distributed transactions and ensuring data consistency across services.",
                    "Serverless is great for scaling, but it requires rethinking how we build and deploy applications — especially in terms of state management and long-running processes.",
                    "I love the flexibility of a RESTful API, but I’m starting to see more teams move towards gRPC for better performance in internal service communication.",
                    "I’m trying to wrap my head around the differences between CQRS and event sourcing. It seems like both focus on decoupling writes from reads, but in different ways.",
                    "The idea of separating read and write models is interesting in theory, but implementing this at scale requires careful consideration of eventual consistency.",
                    "I think adopting a microkernel architecture for our plugin-based application is the right approach, but I wonder if it’ll make the system harder to maintain in the long run."
            );

            List<PostDTO> testPostDTOS = Arrays.asList(
                    new PostDTO("Esslingen am Neckar <10km #1", 9.30929, 48.74007),
                    new PostDTO("Wäldenbronn <10km #2", 9.31221, 48.75768),
                    new PostDTO("Nellingen auf den Fildern <10km #3", 9.29716, 48.71413),
                    new PostDTO("Wendlingen am Neckar <10km #4", 9.37630, 48.67022),
                    new PostDTO("Deizisau <10km #5", 9.38455, 48.71092),
                    new PostDTO("Plochingen <10km #6", 9.41999, 48.70996),
                    new PostDTO("Baltmannsweiler <10km #7", 9.27531, 48.80823),
                    new PostDTO("Kernen im Remstal <10km #8", 9.31949, 48.80439),

                    new PostDTO("10km > Stuttgart <12km #1", 9.17771, 48.77464),
                    new PostDTO("10km > Korb <12km #2", 9.35882, 48.84339),
                    new PostDTO("10km > Oberboihingen <12km #3", 9.36378, 48.64879),

                    new PostDTO("15km > Kirchheim unter Teck < 20km #1", 9.44893, 48.64834),
                    new PostDTO("15km > Aichtal < 20km #2", 9.25323, 48.62610),
                    new PostDTO("15km > Remseck am Neckar < 20km #3", 9.26903, 48.86562));

            for (PostDTO postDTO : testPostDTOS) {
                Integer randInt = random.nextInt(comments.size()/10);
                Post post = postDTO.toPost();
                post.setContent(postDTO.getContent() + " NOW");
                post.setUser(created_user);
                post.setVoteCount(random.nextInt(-500, 500));
                post.setCommentCount(randInt);
                post.setCreated(LocalDateTime.now().minusMinutes(random.nextInt(0, 15)));
                postRepository.save(post);

                for(int i = 0; i < randInt; i++){
                    CommentCreateDTO commentCreateDTO = new CommentCreateDTO();
                    commentCreateDTO.setPostId(post.getId());
                    commentCreateDTO.setContent(comments.get(random.nextInt(comments.size())));

                    Comment comment = commentCreateDTO.toComment(created_user, post);
                    comment.setVoteCount(random.nextInt(-100, 100));

                    post.addComment(comment);
                    user.addComment(comment);
                    commentRepository.save(comment);
                }
            }


            for (PostDTO postDTO : testPostDTOS) {
                Integer randInt = random.nextInt(comments.size()/4);
                Post post = postDTO.toPost();
                post.setContent(postDTO.getContent() + " TODAY");
                post.setUser(created_user);
                post.setVoteCount(random.nextInt(-500, 500));
                post.setCommentCount(randInt);
                post.setCreated(LocalDate.now().atStartOfDay().plusHours(random.nextInt(0, 23)).plusMinutes(random.nextInt(0, 59)).plusSeconds(random.nextInt(0, 59)));
                postRepository.save(post);

                for(int i = 0; i < randInt; i++){
                    CommentCreateDTO commentCreateDTO = new CommentCreateDTO();
                    commentCreateDTO.setPostId(post.getId());
                    commentCreateDTO.setContent(comments.get(random.nextInt(comments.size())));

                    Comment comment = commentCreateDTO.toComment(created_user, post);
                    comment.setVoteCount(random.nextInt(-100, 100));

                    post.addComment(comment);
                    user.addComment(comment);
                    commentRepository.save(comment);
                }
            }

            for (PostDTO postDTO : testPostDTOS) {
                Integer randInt = random.nextInt(comments.size()/4);
                Post post = postDTO.toPost();
                post.setContent(postDTO.getContent() + " WEEK");
                post.setUser(created_user);
                post.setVoteCount(random.nextInt(-500, 500));
                post.setCommentCount(randInt);
                post.setCreated(LocalDate.now().atStartOfDay().minusDays(random.nextInt(0, 6)).plusHours(random.nextInt(0, 23)).plusMinutes(random.nextInt(0, 59)).plusSeconds(random.nextInt(0, 59)));
                postRepository.save(post);

                for(int i = 0; i < randInt; i++){
                    CommentCreateDTO commentCreateDTO = new CommentCreateDTO();
                    commentCreateDTO.setPostId(post.getId());
                    commentCreateDTO.setContent(comments.get(random.nextInt(comments.size())));

                    Comment comment = commentCreateDTO.toComment(created_user, post);
                    comment.setVoteCount(random.nextInt(-100, 100));

                    post.addComment(comment);
                    user.addComment(comment);
                    commentRepository.save(comment);
                }
            }

        };
    }
}