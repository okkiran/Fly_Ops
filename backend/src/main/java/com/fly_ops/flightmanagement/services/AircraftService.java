package com.fly_ops.flightmanagement.services;

import com.fly_ops.flightmanagement.models.Aircraft;
import com.fly_ops.flightmanagement.repositories.AircraftRepository;
import com.fly_ops.flightmanagement.utils.GenerateID;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.core.publisher.Flux;

import java.time.LocalDateTime;

@Service
public class AircraftService {

    private final AircraftRepository aircraftRepository;

    public AircraftService(AircraftRepository aircraftRepository) {
        this.aircraftRepository = aircraftRepository;
    }

    // Get all aircraft
    public Flux<Aircraft> getAllAircrafts() {
        return aircraftRepository.findAll();
    }

    // Get an aircraft by ID
    public Mono<Aircraft> getAircraft(String id) {
        return aircraftRepository.findById(id);
    }

    // Create a new aircraft
    public Mono<Aircraft> createAircraft(String code, String description, String updateUser) {
        String newAircraftID = GenerateID.generateUUID();
        LocalDateTime now = LocalDateTime.now();

        Aircraft aircraft = new Aircraft(newAircraftID, code, description, now, now, updateUser);

        return aircraftRepository.save(aircraft);
    }

    // Update an existing aircraft
    public Mono<Aircraft> updateAircraft(String id, String code, String description, String updateUser) {
        return getAircraft(id)
                .flatMap(aircraft -> {
                    aircraft.setCode(code);
                    aircraft.setDescription(description);
                    aircraft.setUpdateTime(LocalDateTime.now());
                    aircraft.setUpdateUser(updateUser);
                    return aircraftRepository.save(aircraft);
                });
    }

    // Delete an aircraft by ID
    public Mono<Void> deleteAircraftById(String id) {
        return aircraftRepository.deleteById(id);
    }
}
