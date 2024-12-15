package com.example.jodel_app.post;

import org.springframework.cglib.core.Local;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    @Query(value = "SELECT * FROM post WHERE ST_DWithin(location, ST_MakePoint(:longitude, :latitude)::geography, :radius)", nativeQuery = true)
    List<Post> findPostsNearby
            (@Param("longitude") double longitude,
            @Param("latitude") double latitude,
            @Param("radius") double radius);


    @Query(value = "SELECT * FROM post p WHERE ST_DWithin(location, ST_MakePoint(:longitude, :latitude)::geography, :radius) AND p.created BETWEEN :startTime AND :endTime ORDER BY p.created DESC  ", nativeQuery = true)
    List<Post> findPostsNearbyAndFilterByNewest(
             @Param("longitude") double longitude,
             @Param("latitude") double latitude,
             @Param("radius") double radius,
             @Param("startTime")LocalDateTime startTime,
             @Param("endTime") LocalDateTime endTime
                         );

    @Query(value = "SELECT * FROM post p WHERE ST_DWithin(location, ST_MakePoint(:longitude, :latitude)::geography, :radius) AND p.created BETWEEN :startTime AND :endTime ORDER BY p.comment_count DESC", nativeQuery = true)
    List<Post> findPostsNearbyAndFilterByComments(
            @Param("longitude") double longitude,
            @Param("latitude") double latitude,
            @Param("radius") double radius,
            @Param("startTime")LocalDateTime startTime,
            @Param("endTime") LocalDateTime endTime
    );

    @Query(value = "SELECT * FROM post p WHERE ST_DWithin(location, ST_MakePoint(:longitude, :latitude)::geography, :radius) AND p.created BETWEEN :startTime AND :endTime ORDER BY p.vote_count DESC", nativeQuery = true)
    List<Post> findPostsNearbyAndFilterByLoudest(
            @Param("longitude") double longitude,
            @Param("latitude") double latitude,
            @Param("radius") double radius,
            @Param("startTime")LocalDateTime startTime,
            @Param("endTime") LocalDateTime endTime
    );


}
