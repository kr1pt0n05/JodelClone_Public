package com.example.jodel_app.dto;

import com.example.jodel_app.post.Post;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;

// This Data Transfer Object will ensure that a user is not able to initialize or change attributes
// other than content and location of a Post object.
// It will be used in UserController class to only retrieve content and location attributes of the POST request.
public class PostDTO {
    private final static GeometryFactory geometryFactory = new GeometryFactory();
    private String content;
    private double longitude;
    private double latitude;

    public PostDTO(String content, double longitude, double latitude) {
        this.content = content;
        this.longitude = longitude;
        this.latitude = latitude;
    }

    // Convert DTO to Post
    public Post toPost() {
        Point point = geometryFactory.createPoint(new Coordinate(this.longitude, this.latitude));

        Post post = new Post();
        post.setContent(this.getContent());
        post.setLocation(point);
        return post;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }
}
