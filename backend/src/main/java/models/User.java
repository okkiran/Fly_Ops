package models;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long ID;

    @Column(nullable = false, unique = true)
    private String UserName;

    private String Name;

    private String Surname;

    @Column(nullable = false, updatable = false)
    private LocalDateTime CreTime;

    private LocalDateTime UpdateTime;

    private String UpdateUser;

    @PrePersist
    protected void onCreate() {
        this.CreTime = LocalDateTime.now();
        this.UpdateTime = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.UpdateTime = LocalDateTime.now();
    }

    // Getters and Setters

    public Long getID() {
        return ID;
    }

    public void setID(Long ID) {
        this.ID = ID;
    }

    public String getUserName() {
        return UserName;
    }

    public void setUserName(String userName) {
        this.UserName = userName;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        this.Name = name;
    }

    public String getSurname() {
        return Surname;
    }

    public void setSurname(String surname) {
        this.Surname = surname;
    }

    public LocalDateTime getCreTime() {
        return CreTime;
    }

    public void setCreTime(LocalDateTime creTime) {
        this.CreTime = creTime;
    }

    public LocalDateTime getUpdateTime() {
        return UpdateTime;
    }

    public void setUpdateTime(LocalDateTime updateTime) {
        this.UpdateTime = updateTime;
    }

    public String getUpdateUser() {
        return UpdateUser;
    }

    public void setUpdateUser(String updateUser) {
        this.UpdateUser = updateUser;
    }

    public String getPassword() {
        return "";
    }
}
