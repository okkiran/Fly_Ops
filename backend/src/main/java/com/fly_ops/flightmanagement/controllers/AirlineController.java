package com.fly_ops.flightmanagement.controllers;

import com.fly_ops.flightmanagement.models.Airline;
import com.fly_ops.flightmanagement.services.AirlineService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

@RestController
@RequestMapping("/api/airlines")
@CrossOrigin(origins = "http://localhost:5175")  // Adjust URL if needed
public class AirlineController {

    private final AirlineService airlineService;

    public AirlineController(AirlineService airlineService) {
        this.airlineService = airlineService;
    }

    // Get all airlines
    @GetMapping
    public Mono<ResponseEntity<Flux<Airline>>> getAllAirlines() {
        Flux<Airline> airlines = airlineService.findAll();  // This returns a Flux<Airline>
        return Mono.just(ResponseEntity.ok().body(airlines));  // Wrap it in a ResponseEntity and return as a Mono
    }



    // Get airline by ID
    @GetMapping("/{id}")
    public Mono<ResponseEntity<Airline>> getAirline(@PathVariable String id) {
        return airlineService.findById(id)
                .map(airline -> ResponseEntity.ok().body(airline))
                .retry();
    }

    // Create a new airline
    @PostMapping
    public Mono<ResponseEntity<Airline>> createAirline(@RequestBody AirlineDto dto) {
        return airlineService.createAirline(dto.code(), dto.description(), "SystemUser")
                .publishOn(Schedulers.boundedElastic())
                .map(createdAirline -> ResponseEntity.status(HttpStatus.CREATED).body(createdAirline.block()));
    }

    // Update an existing airline
    @PutMapping("/{id}")
    public Mono<ResponseEntity<Mono<Airline>>> updateAirline(@PathVariable String id, @RequestBody AirlineDto dto) {
        return airlineService.updateAirline(id, dto.code(), dto.description(), "SystemUser")
                .map(updatedAirline -> ResponseEntity.ok().body(updatedAirline));
    }

    // Delete an airline
    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> deleteAirline(@PathVariable String id) {
        return airlineService.deleteById(id)
                .then(Mono.just(ResponseEntity.noContent().build()));
    }

    // DTO class for airline creation and updates
        record AirlineDto(String code, String description) {

    }
}
