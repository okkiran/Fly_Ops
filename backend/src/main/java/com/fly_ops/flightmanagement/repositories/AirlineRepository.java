package com.fly_ops.flightmanagement.repositories;

import com.azure.spring.data.cosmos.repository.ReactiveCosmosRepository;
import com.fly_ops.flightmanagement.models.Airline;
import org.springframework.stereotype.Repository;

@Repository
public interface AirlineRepository extends ReactiveCosmosRepository<Airline, String> {
    //ReactiveCosmosRepository provides all needed functionality.
}
