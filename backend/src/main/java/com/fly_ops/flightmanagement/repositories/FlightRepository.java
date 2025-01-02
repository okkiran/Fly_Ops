package com.fly_ops.flightmanagement.repositories;

import com.azure.spring.data.cosmos.repository.ReactiveCosmosRepository;
import com.fly_ops.flightmanagement.models.Flight;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface FlightRepository extends ReactiveCosmosRepository<Flight, String> {
    public Mono<Flight> existsByAirlineIdAndFlightNoAndFlightLegAndFlightDate(String id, Object flightNo, Object flightLeg, Object flightDate);

}


