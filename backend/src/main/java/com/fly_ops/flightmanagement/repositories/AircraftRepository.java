package com.fly_ops.flightmanagement.repositories;

import com.azure.spring.data.cosmos.repository.ReactiveCosmosRepository;
import com.fly_ops.flightmanagement.models.Aircraft;
import org.springframework.stereotype.Repository;

@Repository
public interface AircraftRepository extends ReactiveCosmosRepository<Aircraft, String> {
    // Custom query methods can go here if needed
}
