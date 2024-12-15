package com.example.jodel_app.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.ModelAndView;

@ControllerAdvice
public class GlobalExceptionHandler {

    private ModelAndView createMowObject(Exception ex, HttpStatus status){
        ModelAndView mow = new ModelAndView("error");
        mow.setStatus(status);
        mow.addObject("errorMessage", ex.getMessage());
        mow.addObject("statusCode", status.value());
        return mow;
    }

    @ExceptionHandler(IllegalStateException.class)
    public ModelAndView handleIllegalStateException(IllegalStateException ex){
        return createMowObject(ex, HttpStatus.BAD_REQUEST);
    }

}
