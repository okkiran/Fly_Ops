package com.fly_ops.flightmanagement.utils;

import java.util.UUID;

public class GenerateID {
    // Method to generate a random UUID
    public static String generateUUID() {
        // Generate and return a unique identifier as a UUID string
        return UUID.randomUUID().toString();
    }

    public static void main(String[] args) {
        // Test the generateUUID method
        System.out.println("Generated ID: " + generateUUID());
    }
}
