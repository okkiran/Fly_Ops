package com.fly_ops.flightmanagement.services;

import com.fly_ops.flightmanagement.models.Airline;
import com.fly_ops.flightmanagement.repositories.AirlineRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;


@Service
public class AirlineService {

    private final AirlineRepository airlineRepository;

    public AirlineService(AirlineRepository airlineRepository) {
        this.airlineRepository = airlineRepository;
    }

    // Get all airlines (returns Flux instead of Mono for collections)
    public Flux<Airline> findAll() {
        return airlineRepository.findAll();  // Directly return the Flux
    }

    // Get airline by ID
    public Mono<Airline> findById(String id) {
        return airlineRepository.findById(id);  // Returns Mono<Airline>
    }

    // Create a new airline
    public Mono<Mono<Airline>> createAirline(String code, String description, String updateUser) {
        Airline airline = new Airline(null, code, description, null, null, updateUser);
        return Mono.just(airlineRepository.save(airline));  // Wrap the save result in Mono
    }

    // Update an existing airline
    public Mono<Mono<Airline>> updateAirline(String id, String code, String description, String updateUser) {
        return findById(id)
                .map(airline -> {
                    airline.setCode(code);
                    airline.setDescription(description);
                    airline.setUpdateUser(updateUser);
                    return airlineRepository.save(airline);
                });
    }

    // Delete an airline by ID
    public Mono<Void> deleteById(String id) {
        return Mono.fromRunnable(() -> airlineRepository.deleteById(id));  // Using Mono for void operations
    }
}
