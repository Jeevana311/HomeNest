package com.homenest.api.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.time.LocalDate;

@Entity
@Getter @Setter @NoArgsConstructor
public class ScheduledVisit {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonIgnore @ManyToOne(optional = false) private User customer;
    @JsonIgnore @ManyToOne(optional = false) private Property property;
    @Column(nullable = false) private String name;
    @Column(nullable = false) private String phone;
    @Column(nullable = false) private LocalDate visitDate;
    @Column(nullable = false) private String visitTime;
    private String notes;
    @Column(nullable = false) private String status = "REQUESTED";
    @Column(nullable = false) private Instant createdAt = Instant.now();
}
