package com.fly_ops.flightmanagement.repositories;

import com.azure.spring.data.cosmos.repository.ReactiveCosmosRepository;
import com.fly_ops.flightmanagement.models.Station;
import org.springframework.stereotype.Repository;

@Repository
public interface StationRepository extends ReactiveCosmosRepository<Station, String> {
    // Custom query methods can go here if needed
}
