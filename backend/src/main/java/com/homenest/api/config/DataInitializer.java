package com.homenest.api.config;

import com.homenest.api.model.Property;
import com.homenest.api.repository.PropertyRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner seedProperties(PropertyRepository repository) {
        return args -> {

            List<Property> seedData = List.of(

                // ==================== BUY PROPERTIES ====================

                property(
                    "Luxury Villa",
                    "Guntur",
                    "buy",
                    "residential",
                    "villa",
                    125,
                    2200,
                    "₹1.25 Crore",
                    "Featured",
                    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=88",
                    List.of("3 Beds", "3 Baths", "2200 sq.ft"),
                    LocalDate.of(2026, 8, 30)
                ),

                property(
                    "Modern Apartment",
                    "Vijayawada",
                    "buy",
                    "residential",
                    "apartment",
                    78,
                    1350,
                    "₹78 Lakhs",
                    "New",
                    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=88",
                    List.of("2 Beds", "2 Baths", "1350 sq.ft"),
                    LocalDate.of(2026, 8, 31)
                ),

                property(
                    "Premium Office Space",
                    "Vijayawada",
                    "buy",
                    "commercial",
                    "office-space",
                    65,
                    1800,
                    "₹65 Lakhs",
                    "Commercial",
                    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=88",
                    List.of("1800 sq.ft", "3rd Floor", "Furnished"),
                    LocalDate.of(2026, 8, 28)
                ),

                property(
                    "Residential Plot",
                    "Tenali",
                    "buy",
                    "land",
                    "residential-plot",
                    42,
                    2160,
                    "₹42 Lakhs",
                    "Popular",
                    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=88",
                    List.of("240 sq.yd", "East Facing", "40 ft Road"),
                    LocalDate.of(2026, 8, 25)
                ),

                property(
                    "Warehouse Space",
                    "Guntur",
                    "buy",
                    "industrial",
                    "warehouse",
                    110,
                    5000,
                    "₹1.10 Crore",
                    "Industrial",
                    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=88",
                    List.of("5000 sq.ft", "Loading Area", "100 HP Power"),
                    LocalDate.of(2026, 8, 22)
                ),

                property(
                    "Premium Showroom for Sale",
                    "Tenali",
                    "buy",
                    "commercial",
                    "showroom",
                    88,
                    1500,
                    "₹88 Lakhs",
                    "Commercial",
                    "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=88",
                    List.of("1500 sq.ft", "Ground Floor", "Parking"),
                    LocalDate.of(2026, 8, 29)
                ),

                property(
                    "Furnished Apartment",
                    "Guntur",
                    "buy",
                    "residential",
                    "apartment",
                    58,
                    1200,
                    "₹58 Lakhs",
                    "Ready to Move",
                    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=88",
                    List.of("2 Beds", "2 Baths", "Furnished"),
                    LocalDate.of(2026, 8, 27)
                ),

                property(
                    "Co-living Building for Sale",
                    "Vijayawada",
                    "buy",
                    "rental",
                    "co-living",
                    145,
                    4200,
                    "₹1.45 Crore",
                    "Investment",
                    "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=88",
                    List.of("18 Rooms", "Fully Furnished", "Operational"),
                    LocalDate.of(2026, 8, 26)
                ),

                property(
                    "Main Road Retail Shop for Sale",
                    "Guntur",
                    "buy",
                    "commercial",
                    "shop",
                    72,
                    900,
                    "₹72 Lakhs",
                    "Commercial",
                    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=88",
                    List.of("900 sq.ft", "Ground Floor", "Main Road"),
                    LocalDate.of(2026, 8, 24)
                ),

                property(
                    "Commercial Plot",
                    "Vijayawada",
                    "buy",
                    "land",
                    "commercial-plot",
                    95,
                    3600,
                    "₹95 Lakhs",
                    "Plots & Land",
                    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=88",
                    List.of("400 sq.yd", "West Facing", "60 ft Road"),
                    LocalDate.of(2026, 8, 21)
                ),

                property(
                    "Agricultural Land",
                    "Tenali",
                    "buy",
                    "land",
                    "agricultural-land",
                    70,
                    87120,
                    "₹70 Lakhs",
                    "Agricultural",
                    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=88",
                    List.of("2 Acres", "Road Access", "Clear Title"),
                    LocalDate.of(2026, 8, 20)
                ),

                property(
                    "Manufacturing Factory",
                    "Vijayawada",
                    "buy",
                    "industrial",
                    "factory",
                    180,
                    8500,
                    "₹1.80 Crore",
                    "Industrial",
                    "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1200&q=88",
                    List.of("8500 sq.ft", "Loading Bay", "150 HP Power"),
                    LocalDate.of(2026, 8, 19)
                ),

                property(
                    "Industrial Shed for Sale",
                    "Tenali",
                    "buy",
                    "industrial",
                    "industrial-shed",
                    92,
                    4200,
                    "₹92 Lakhs",
                    "Industrial",
                    "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=88",
                    List.of("4200 sq.ft", "Truck Access", "75 HP Power"),
                    LocalDate.of(2026, 8, 23)
                ),

                property(
                    "Women's PG Building for Sale",
                    "Guntur",
                    "buy",
                    "rental",
                    "pg-hostel",
                    135,
                    3800,
                    "₹1.35 Crore",
                    "Investment",
                    "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=88",
                    List.of("24 Beds", "Food Facility", "Fully Furnished"),
                    LocalDate.of(2026, 8, 18)
                ),

                property(
                    "Guest House for Sale",
                    "Tenali",
                    "buy",
                    "rental",
                    "guest-house",
                    98,
                    2600,
                    "₹98 Lakhs",
                    "Investment",
                    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=88",
                    List.of("12 Rooms", "Attached Baths", "Parking"),
                    LocalDate.of(2026, 8, 17)
                ),

                // ==================== RENT PROPERTIES ====================

                property(
                    "2 BHK Rental Apartment",
                    "Guntur",
                    "rent",
                    "residential",
                    "apartment",
                    18,
                    1100,
                    "₹18,000 / month",
                    "For Rent",
                    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=88",
                    List.of("2 Beds", "2 Baths", "Semi-Furnished"),
                    LocalDate.of(2026, 9, 1)
                ),

                property(
                    "Independent House for Rent",
                    "Vijayawada",
                    "rent",
                    "residential",
                    "independent-house",
                    25,
                    1650,
                    "₹25,000 / month",
                    "For Rent",
                    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=88",
                    List.of("3 Beds", "3 Baths", "Parking"),
                    LocalDate.of(2026, 8, 31)
                ),

                property(
                    "Rental Villa",
                    "Tenali",
                    "rent",
                    "residential",
                    "villa",
                    38,
                    2400,
                    "₹38,000 / month",
                    "Premium Rent",
                    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=88",
                    List.of("3 Beds", "3 Baths", "Furnished"),
                    LocalDate.of(2026, 8, 30)
                ),

                property(
                    "Office Space for Rent",
                    "Guntur",
                    "rent",
                    "commercial",
                    "office-space",
                    42,
                    1600,
                    "₹42,000 / month",
                    "Commercial Rent",
                    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=88",
                    List.of("1600 sq.ft", "2nd Floor", "Furnished"),
                    LocalDate.of(2026, 8, 29)
                ),

                property(
                    "Retail Shop for Rent",
                    "Vijayawada",
                    "rent",
                    "commercial",
                    "shop",
                    30,
                    750,
                    "₹30,000 / month",
                    "For Rent",
                    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=88",
                    List.of("750 sq.ft", "Ground Floor", "Main Road"),
                    LocalDate.of(2026, 8, 28)
                ),

                property(
                    "Showroom for Rent",
                    "Tenali",
                    "rent",
                    "commercial",
                    "showroom",
                    55,
                    1500,
                    "₹55,000 / month",
                    "Commercial Rent",
                    "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=88",
                    List.of("1500 sq.ft", "Ground Floor", "Parking"),
                    LocalDate.of(2026, 8, 27)
                ),

                property(
                    "Residential Plot on Lease",
                    "Guntur",
                    "rent",
                    "land",
                    "residential-plot",
                    20,
                    2700,
                    "₹20,000 / month",
                    "For Lease",
                    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=88",
                    List.of("300 sq.yd", "East Facing", "40 ft Road"),
                    LocalDate.of(2026, 8, 26)
                ),

                property(
                    "Commercial Land on Lease",
                    "Vijayawada",
                    "rent",
                    "land",
                    "commercial-plot",
                    45,
                    4500,
                    "₹45,000 / month",
                    "For Lease",
                    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=88",
                    List.of("500 sq.yd", "Corner Plot", "60 ft Road"),
                    LocalDate.of(2026, 8, 25)
                ),

                property(
                    "Farm Land on Lease",
                    "Tenali",
                    "rent",
                    "land",
                    "agricultural-land",
                    28,
                    87120,
                    "₹28,000 / month",
                    "Farm Lease",
                    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=88",
                    List.of("2 Acres", "Water Access", "Road Access"),
                    LocalDate.of(2026, 8, 24)
                ),

                property(
                    "Warehouse for Rent",
                    "Guntur",
                    "rent",
                    "industrial",
                    "warehouse",
                    60,
                    5200,
                    "₹60,000 / month",
                    "Industrial Rent",
                    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=88",
                    List.of("5200 sq.ft", "Loading Dock", "Truck Access"),
                    LocalDate.of(2026, 8, 23)
                ),

                property(
                    "Factory for Rent",
                    "Vijayawada",
                    "rent",
                    "industrial",
                    "factory",
                    85,
                    7800,
                    "₹85,000 / month",
                    "Industrial Rent",
                    "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1200&q=88",
                    List.of("7800 sq.ft", "Loading Area", "150 HP Power"),
                    LocalDate.of(2026, 8, 22)
                ),

                property(
                    "Industrial Shed for Rent",
                    "Tenali",
                    "rent",
                    "industrial",
                    "industrial-shed",
                    48,
                    4200,
                    "₹48,000 / month",
                    "For Rent",
                    "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=88",
                    List.of("4200 sq.ft", "Truck Access", "75 HP Power"),
                    LocalDate.of(2026, 8, 21)
                ),

                property(
                    "Women's PG Hostel",
                    "Guntur",
                    "rent",
                    "rental",
                    "pg-hostel",
                    9,
                    350,
                    "₹9,000 / month",
                    "PG / Hostel",
                    "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=88",
                    List.of("Triple Sharing", "Food Included", "Wi-Fi"),
                    LocalDate.of(2026, 8, 20)
                ),

                property(
                    "Co-living Space",
                    "Vijayawada",
                    "rent",
                    "rental",
                    "co-living",
                    12,
                    450,
                    "₹12,000 / month",
                    "Co-living",
                    "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=88",
                    List.of("Twin Sharing", "Wi-Fi", "Food Available"),
                    LocalDate.of(2026, 8, 19)
                ),

                property(
                    "Comfort Guest House",
                    "Tenali",
                    "rent",
                    "rental",
                    "guest-house",
                    18,
                    700,
                    "₹18,000 / month",
                    "Guest House",
                    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=88",
                    List.of("Private Room", "Attached Bath", "Parking"),
                    LocalDate.of(2026, 8, 18)
                )
            );

            // Add only properties that do not already exist.
            // This prevents duplicate seed data after every Render restart.
            List<Property> existingProperties = repository.findAll();

            for (Property seedProperty : seedData) {

                boolean alreadyExists = existingProperties.stream()
                    .anyMatch(existingProperty ->
                        existingProperty.getTitle() != null
                            && existingProperty.getMode() != null
                            && existingProperty.getTitle()
                                .equalsIgnoreCase(seedProperty.getTitle())
                            && existingProperty.getMode()
                                .equalsIgnoreCase(seedProperty.getMode())
                    );

                if (!alreadyExists) {
                    repository.save(seedProperty);
                }
            }
        };
    }

    private Property property(
        String title,
        String location,
        String mode,
        String category,
        String type,
        double price,
        double area,
        String priceLabel,
        String badge,
        String image,
        List<String> details,
        LocalDate postedDate
    ) {

        Property property = new Property();

        property.setTitle(title);
        property.setLocation(location);
        property.setMode(mode);
        property.setCategory(category);
        property.setType(type);
        property.setPrice(price);
        property.setArea(area);
        property.setPriceLabel(priceLabel);
        property.setBadge(badge);
        property.setImage(image);
        property.setDetails(details);
        property.setPostedDate(postedDate);

        return property;
    }
}