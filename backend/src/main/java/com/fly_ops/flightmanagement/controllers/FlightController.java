package com.fly_ops.flightmanagement.controllers;

import com.fly_ops.flightmanagement.models.Flight;
import com.fly_ops.flightmanagement.services.FlightService;
import com.fly_ops.flightmanagement.models.Station;
import com.fly_ops.flightmanagement.services.StationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import reactor.core.publisher.Mono;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api/flights")
public class FlightController {

    @Autowired
    private FlightService flightService;

    @Autowired
    private StationService stationService;  // Station service for fetching the stations

    // Get all flights
    @GetMapping
    public Flux<Flight> getAllFlights() {
        return flightService.getAllFlights();
    }

    // Get flight by ID
    @GetMapping("/{id}")
    public Mono<Flight> getFlightById(@PathVariable String id) {
        return flightService.getFlightById(id);
    }

    // Create a new flight
    @PostMapping
    public Mono<Flight> createFlight(@RequestBody Flight flight) {
        Mono<Station> systemAirport = stationService.getStationById(flight.getSystemAirport().getId());
        Mono<Station> originStation = stationService.getStationById(flight.getOriginStation().getId());

        return Mono.zip(systemAirport, originStation)
                .flatMap(stations -> {
                    flight.setSystemAirport(stations.getT1());
                    flight.setOriginStation(stations.getT2());
                    return flightService.createFlight(flight);
                })
                .onErrorResume(e -> {
                    // Enhanced error handling
                    System.out.println("Error during flight creation: " + e.getMessage());
                    return Mono.error(new Exception("Invalid data: " + e.getMessage()));
                });
    }



    // Update an existing flight
    @PutMapping("/{id}")
    public Mono<Flight> updateFlight(@PathVariable String id, @RequestBody Flight flight) {
        return flightService.updateFlight(id, flight);
    }

    // Delete a flight
    @DeleteMapping("/{id}")
    public Mono<Void> deleteFlight(@PathVariable String id) {
        return flightService.deleteFlight(id);
    }
}
