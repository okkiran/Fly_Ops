package com.fly_ops.flightmanagement.services;

import com.fly_ops.flightmanagement.models.Airline;
import com.fly_ops.flightmanagement.repositories.AirlineRepository;
import reactor.core.publisher.Mono;
import reactor.core.publisher.Flux;
import com.fly_ops.flightmanagement.utils.GenerateID;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;


@Service
public class AirlineService {
    private final AirlineRepository airlineRepository;

    public AirlineService(AirlineRepository airlineRepository) {
        this.airlineRepository = airlineRepository;
    }

    // Get all airlines
    public Flux<Airline> findAll() {
        return airlineRepository.findAll();
    }

    // Get airline by ID
    public Mono<Airline> findById(String id) {
        return airlineRepository.findById(id);
    }

    // Create a new airline
    public Mono<Airline> createAirline(String code, String description, String updateUser) {
        String newAirlineID = GenerateID.generateUUID();
        LocalDateTime now = LocalDateTime.now();

        Airline airline = new Airline(newAirlineID, code, description, now, now, updateUser);

        return airlineRepository.save(airline);
    }

    // Update an existing airline
    public Mono<Airline> updateAirline(String id, String code, String description, String updateUser) {
        return findById(id)
                .flatMap(airline -> {
                    airline.setCode(code);
                    airline.setDescription(description);
                    airline.setUpdateTime(LocalDateTime.now());
                    airline.setUpdateUser(updateUser);
                    return airlineRepository.save(airline);
                });
    }

    // Delete an airline by ID
    public Mono<Void> deleteById(String id) {
        return airlineRepository.deleteById(id);
    }
}