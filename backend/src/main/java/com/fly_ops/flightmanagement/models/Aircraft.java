package com.fly_ops.flightmanagement.models;

import com.azure.spring.data.cosmos.core.mapping.Container;
import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.data.annotation.Id;
import java.time.LocalDateTime;

@Container(containerName = "aircrafts")
public class Aircraft {

    @Id
    private String id;
    private String code;
    private String description;

    @JsonFormat(shape = JsonFormat.Shape.ARRAY)
    private LocalDateTime creTime;

    @JsonFormat(shape = JsonFormat.Shape.ARRAY)
    private LocalDateTime updateTime;

    private String updateUser;

    // Default constructor
    public Aircraft() {}

    // Full constructor
    public Aircraft(String id, String code, String description, LocalDateTime creTime, LocalDateTime updateTime, String updateUser) {
        this.id = id;
        this.code = code;
        this.description = description;
        this.creTime = creTime;
        this.updateTime = updateTime;
        this.updateUser = updateUser;
    }

    // Getters and setters
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
