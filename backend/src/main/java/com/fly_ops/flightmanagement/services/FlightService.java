package com.fly_ops.flightmanagement.services;

import com.fly_ops.flightmanagement.models.Flight;
import com.fly_ops.flightmanagement.repositories.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.core.publisher.Flux;

@Service
public class FlightService {

    @Autowired
    private FlightRepository flightRepository;

    // Fetch all flights
    public Flux<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    // Get a flight by ID
    public Mono<Flight> getFlightById(String id) {
        return flightRepository.findById(id);
    }

    // Create a new flight
    public Mono<Flight> createFlight(Flight flight) {
        return flightRepository.save(flight);
    }

    // Update an existing flight
    public Mono<Flight> updateFlight(String id, Flight flight) {
        return flightRepository.findById(id)
                .flatMap(existingFlight -> {
                    existingFlight.setFlightNo(flight.getFlightNo());
                    existingFlight.setFlightDate(flight.getFlightDate());
                    existingFlight.setAircraft(flight.getAircraft());
                    existingFlight.setFlightLeg(flight.getFlightLeg());
                    existingFlight.setSystemAirport(flight.getSystemAirport());
                    existingFlight.setOriginStation(flight.getOriginStation());
                    existingFlight.setUpdateTime(flight.getUpdateTime());
                    existingFlight.setUpdateUser(flight.getUpdateUser());

                    return flightRepository.save(existingFlight);
                });
    }

    // Delete a flight by ID
    public Mono<Void> deleteFlight(String id) {
        return flightRepository.deleteById(id);
    }
}
