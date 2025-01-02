package com.fly_ops.flightmanagement.controllers;

import com.fly_ops.flightmanagement.models.Station;
import com.fly_ops.flightmanagement.services.StationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api/stations")
@CrossOrigin(origins = "http://localhost:5173")  // Adjust URL if needed
public class StationController {

    private final StationService stationService;

    public StationController(StationService stationService) {
        this.stationService = stationService;
    }

    // Get all stations
    @GetMapping
    public Mono<ResponseEntity<Flux<Station>>> getAllStations() {
        Flux<Station> stations = stationService.getAllStations();
        return Mono.just(ResponseEntity.ok().body(stations));
    }

    // Get station by ID
    @GetMapping("/{id}")
    public Mono<ResponseEntity<Station>> getStation(@PathVariable String id) {
        return stationService.getStation(id)
                .map(station -> ResponseEntity.ok().body(station))
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    // Create a new station
    @PostMapping
    public Mono<ResponseEntity<Station>> createStation(@RequestBody StationDto dto) {
        return stationService.createStation(dto.code(), dto.description(), "SystemUser")
                .map(createdStation -> ResponseEntity.status(HttpStatus.CREATED).body(createdStation));
    }

    // Update an existing station
    @PutMapping("/{id}")
    public Mono<ResponseEntity<Station>> updateStation(@PathVariable String id, @RequestBody StationDto dto) {
        return stationService.updateStation(id, dto.code(), dto.description(), "SystemUser")
                .map(updatedStation -> ResponseEntity.ok().body(updatedStation));
    }

    // Delete a station
    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Object>> deleteStation(@PathVariable String id) {
        if (id == null || id.isEmpty()) {
            return Mono.just(ResponseEntity.badRequest().body("Invalid ID"));
        }
        return stationService.deleteStationById(id)
                .then(Mono.just(ResponseEntity.noContent().build()));
    }

    // DTO class for station creation and updates
    public record StationDto(String code, String description) {}
}
