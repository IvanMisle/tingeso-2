package com.example.carservice.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "car")
@NoArgsConstructor
@AllArgsConstructor
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    private String licensePlate;
    private String brand;
    private String model;
    private String type;
    private Integer manufactureYear;
    private String typeEngine;
    private Integer numberSeats;
    private Integer mileage;
}
