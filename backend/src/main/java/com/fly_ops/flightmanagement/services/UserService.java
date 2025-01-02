package com.fly_ops.flightmanagement.services;

import com.fly_ops.flightmanagement.models.User;
import com.fly_ops.flightmanagement.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Mono<User> createUser(User user) {
        return userRepository.save(user);
    }

    public Mono<User> getUser(String id) {
        return userRepository.findById(id);
    }

    public Mono<Void> deleteUser(String id) {
        return userRepository.deleteById(id);
    }

    public Mono<User> updateUser(String id, User user) {
        return userRepository.findById(id)
                .flatMap(existingUser -> {
                    existingUser.setUserName(user.getUserName());
                    existingUser.setName(user.getName());
                    existingUser.setSurname(user.getSurname());
                    return userRepository.save(existingUser);
                });
    }
}
