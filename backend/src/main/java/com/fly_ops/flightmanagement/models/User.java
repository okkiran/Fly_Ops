package com.fly_ops.flightmanagement.models;

import com.azure.spring.data.cosmos.core.mapping.Container;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@Container(containerName = "users")
public class User {

    @Id
    private String id;

    private String userName;
    private String name;
    private String surname;
    private LocalDateTime creTime;

    public Object getUserName() {
        return null;
    }

    public void setUserName(Object userName) {
        
    }

    public Object getName() {
        return null;
    }

    public Object getSurname() {
        return null;
    }

    public void setName(Object name) {
    }

    public void setSurname(Object surname) {
    }

    // Constructors, getters, and setters
}
