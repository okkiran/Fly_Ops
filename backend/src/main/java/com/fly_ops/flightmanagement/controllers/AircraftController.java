package com.fly_ops.flightmanagement.controllers;

import com.fly_ops.flightmanagement.models.Aircraft;
import com.fly_ops.flightmanagement.services.AircraftService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api/aircrafts")
@CrossOrigin(origins = "http://localhost:5173")  // Adjust URL if needed
public class AircraftController {

    private final AircraftService aircraftService;

    public AircraftController(AircraftService aircraftService) {
        this.aircraftService = aircraftService;
    }

    // Get all aircraft
    @GetMapping
    public Mono<ResponseEntity<Flux<Aircraft>>> getAllAircrafts() {
        Flux<Aircraft> aircrafts = aircraftService.getAllAircrafts();  // This returns a Flux<Aircraft>
        return Mono.just(ResponseEntity.ok().body(aircrafts));  // Wrap it in a ResponseEntity and return as a Mono
    }

    // Get aircraft by ID
    @GetMapping("/{id}")
    public Mono<ResponseEntity<Aircraft>> getAircraft(@PathVariable String id) {
        return aircraftService.getAircraft(id)
                .map(aircraft -> ResponseEntity.ok().body(aircraft))
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    // Create a new aircraft
    @PostMapping
    public Mono<ResponseEntity<Aircraft>> createAircraft(@RequestBody AircraftDto dto) {
        return aircraftService.createAircraft(dto.code(), dto.description(), "SystemUser")
                .map(createdAircraft -> ResponseEntity.status(HttpStatus.CREATED).body(createdAircraft));
    }

    // Update an existing aircraft
    @PutMapping("/{id}")
    public Mono<ResponseEntity<Aircraft>> updateAircraft(@PathVariable String id, @RequestBody AircraftDto dto) {
        return aircraftService.updateAircraft(id, dto.code(), dto.description(), "SystemUser")
                .map(updatedAircraft -> ResponseEntity.ok().body(updatedAircraft));
    }

    // Delete an aircraft
    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Object>> deleteAircraft(@PathVariable String id) {
        if (id == null || id.isEmpty()) {
            return Mono.just(ResponseEntity.badRequest().body("Invalid ID"));
        }

        return aircraftService.deleteAircraftById(id)
                .then(Mono.just(ResponseEntity.noContent().build()))
                .doOnError(e -> {
                    e.printStackTrace();  // Print the full stack trace to the logs for better visibility
                });
    }

    // DTO class for aircraft creation and updates
    public record AircraftDto(String code, String description) {}
}
