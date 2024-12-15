package com.example.jodel_app.dto;

import com.example.jodel_app.enums.ActivityFilterType;
import com.example.jodel_app.enums.DatetimeFilterType;

public class GetNearbyPostsRequestDTO {
    private Coordinate coordinates;
    private ActivityFilterType activityFilterType = ActivityFilterType.NEWEST;
    private DatetimeFilterType datetimeFilterType = DatetimeFilterType.NOW;


    public GetNearbyPostsRequestDTO(Coordinate coordinates, ActivityFilterType activityFilterType, DatetimeFilterType datetimeFilterType) {
        this.coordinates = coordinates;
        this.activityFilterType = activityFilterType;
        this.datetimeFilterType = datetimeFilterType;
    }

    public Coordinate getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(Coordinate coordinates) {
        this.coordinates = coordinates;
    }

    public ActivityFilterType getActivityFilterType() {
        return activityFilterType;
    }

    public void setActivityFilterType(ActivityFilterType activityFilterType) {
        this.activityFilterType = activityFilterType;
    }

    public DatetimeFilterType getDatetimeFilterType() {
        return datetimeFilterType;
    }

    public void setDatetimeFilterType(DatetimeFilterType datetimeFilterType) {
        this.datetimeFilterType = datetimeFilterType;
    }
}
