package com.homenest.api.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter @NoArgsConstructor
public class Property {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false) private String title;
    @Column(nullable = false) private String location;
    @Column(nullable = false) private String mode;
    @Column(nullable = false) private String category;
    @Column(nullable = false) private String type;
    @Column(nullable = false) private double price;
    @Column(nullable = false) private double area;
    private String priceLabel;
    private String badge;
    private String image;
    private String ownerName;
    private String ownerPhone;
    private LocalDate postedDate;
    @ElementCollection
    @CollectionTable(name = "property_details", joinColumns = @JoinColumn(name = "property_id"))
    @Column(name = "detail")
    private List<String> details = new ArrayList<>();
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "owner_id")
    private User owner;
}
