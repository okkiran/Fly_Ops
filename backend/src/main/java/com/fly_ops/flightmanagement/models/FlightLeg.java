package com.fly_ops.flightmanagement.models;

import com.fasterxml.jackson.annotation.JsonValue;

public enum FlightLeg {
    ARRIVAL("Arr"),
    DEPARTURE("Dep");

    private final String value;

    FlightLeg(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }
}
