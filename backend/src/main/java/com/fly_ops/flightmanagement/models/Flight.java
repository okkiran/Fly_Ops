package com.fly_ops.flightmanagement.models;

import com.azure.spring.data.cosmos.core.mapping.Container;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.data.annotation.Id;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Container(containerName = "flights")
public class Flight {

    @Id
    private String id;
    private Airline airline; // Assuming you have a model for Airline
    private String flightNo;
    private Aircraft aircraft; // Assuming you have a model for Aircraft
    private FlightLeg flightLeg; // Enum (Arr, Dep)
    private LocalDate flightDate;
    private Station systemAirport; // Assuming you have a model for Station
    private Station originStation; // Assuming you have a model for Station

    // Use @DateTimeFormat to specify the custom format for LocalDateTime fields
    @DateTimeFormat(pattern = "MM/dd/yyyy, h:mm:ss a")
    private LocalDateTime creTime;

    @DateTimeFormat(pattern = "MM/dd/yyyy, h:mm:ss a")
    private LocalDateTime updateTime;

    private String updateUser;

    // Getters and setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Airline getAirline() {
        return airline;
    }

    public void setAirline(Airline airline) {
        this.airline = airline;
    }

    public String getFlightNo() {
        return flightNo;
    }

    public void setFlightNo(String flightNo) {
        this.flightNo = flightNo;
    }

    public Aircraft getAircraft() {
        return aircraft;
    }

    public void setAircraft(Aircraft aircraft) {
        this.aircraft = aircraft;
    }

    public FlightLeg getFlightLeg() {
        return flightLeg;
    }

    public void setFlightLeg(FlightLeg flightLeg) {
        this.flightLeg = flightLeg;
    }

    public LocalDate getFlightDate() {
        return flightDate;
    }

    public void setFlightDate(LocalDate flightDate) {
        this.flightDate = flightDate;
    }

    public Station getSystemAirport() {
        return systemAirport;
    }

    public void setSystemAirport(Station systemAirport) {
        this.systemAirport = systemAirport;
    }

    public Station getOriginStation() {
        return originStation;
    }

    public void setOriginStation(Station originStation) {
        this.originStation = originStation;
    }

    public LocalDateTime getCreTime() {
        return creTime;
    }

    public void setCreTime(LocalDateTime creTime) {
        this.creTime = creTime;
    }

    public LocalDateTime getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(LocalDateTime updateTime) {
        this.updateTime = updateTime;
    }

    public String getUpdateUser() {
        return updateUser;
    }

    public void setUpdateUser(String updateUser) {
        this.updateUser = updateUser;
    }
}
