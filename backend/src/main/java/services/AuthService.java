// backend/src/main/java/services/AuthService.java
package services;

import models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repositories.UserRepository;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public User login(String username, String password) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isPresent() && userOptional.get().getPassword().equals(password)) { // Plain-text comparison
            return userOptional.get(); // Return user details if login is successful
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }
}
