package com.fly_ops.flightmanagement.services;

import com.fly_ops.flightmanagement.models.Station;
import com.fly_ops.flightmanagement.repositories.StationRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.core.publisher.Flux;
import java.time.LocalDateTime;
import com.fly_ops.flightmanagement.utils.GenerateID;

@Service
public class StationService {

    private final StationRepository stationRepository;

    public StationService(StationRepository stationRepository) {
        this.stationRepository = stationRepository;
    }

    // Get all stations
    public Flux<Station> getAllStations() {
        return stationRepository.findAll();
    }

    // Get station by ID
    public Mono<Station> getStation(String id) {
        return stationRepository.findById(id);
    }

    // Create a new station
    public Mono<Station> createStation(String code, String description, String updateUser) {
        String newStationID = GenerateID.generateUUID();
        LocalDateTime now = LocalDateTime.now();
        Station station = new Station(newStationID, code, description, now, now, updateUser);
        return stationRepository.save(station);
    }

    // Update an existing station
    public Mono<Station> updateStation(String id, String code, String description, String updateUser) {
        return getStation(id)
                .flatMap(station -> {
                    station.setCode(code);
                    station.setDescription(description);
                    station.setUpdateTime(LocalDateTime.now());
                    station.setUpdateUser(updateUser);
                    return stationRepository.save(station);
                });
    }

    // Delete a station by ID
    public Mono<Void> deleteStationById(String id) {
        return stationRepository.deleteById(id);
    }

    public Mono<Station> getStationById(String id) {
        return stationRepository.findById(id);
    }
}
