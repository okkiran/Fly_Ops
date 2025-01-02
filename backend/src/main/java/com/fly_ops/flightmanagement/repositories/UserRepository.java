package com.fly_ops.flightmanagement.repositories;

import com.azure.spring.data.cosmos.repository.ReactiveCosmosRepository;
import com.fly_ops.flightmanagement.models.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends ReactiveCosmosRepository<User, String> {
    // Custom query methods can go here if needed
}
