package services;

import models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import repositories.UserRepository;


@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder; // For password hashing

    public User login(String username, String password) {
        User user = userRepository.findByUsername(username); // Method to find user by username
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            return user; // Return user details if login is successful
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }
}
