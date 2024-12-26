package com.fly_ops.flightmanagement.models;

import com.azure.spring.data.cosmos.core.mapping.Container;
import org.springframework.data.annotation.Id;
import java.time.LocalDateTime;
import java.util.UUID;

@Container(containerName = "airlines")  // The container for this entity
public class Airline {

    @Id
    private String id;  // This will be generated automatically

    private String code;            // Required
    private String description;     // Optional
    private LocalDateTime creTime;  // System should fill
    private LocalDateTime updateTime; // System should fill
    private String updateUser;      // System should fill

    // Default constructor
    public Airline() {
        this.id = UUID.randomUUID().toString();  // Automatically generate a unique ID
    }

    // Constructor for initialization
    public Airline(String id, String code, String description, LocalDateTime creTime, LocalDateTime updateTime, String updateUser) {
        this.id = id != null ? id : UUID.randomUUID().toString();  // Generate ID if not passed
        this.code = code;
        this.description = description;
        this.updateUser = updateUser;
        this.creTime = creTime != null ? creTime : LocalDateTime.now();  // Default to current time if not passed
        this.updateTime = updateTime != null ? updateTime : LocalDateTime.now(); // Default to current time if not passed
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getCreTime() {
        return creTime;
    }

    public void setCreTime(LocalDateTime creTime) {
        this.creTime = creTime;
    }

    public LocalDateTime getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(LocalDateTime updateTime) {
        this.updateTime = updateTime;
    }

    public String getUpdateUser() {
        return updateUser;
    }

    public void setUpdateUser(String updateUser) {
        this.updateUser = updateUser;
    }
}
