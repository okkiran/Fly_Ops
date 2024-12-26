package com.fly_ops.flightmanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.azure.spring.data.cosmos.repository.config.EnableCosmosRepositories;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;


@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
@EnableCosmosRepositories

public class FlightmanagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(FlightmanagementApplication.class, args);
	}

}
