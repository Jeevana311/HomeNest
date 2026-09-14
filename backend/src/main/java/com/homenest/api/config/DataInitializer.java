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
    CommandLineRunner seedProperties(PropertyRepository properties) {
        return args -> {
            if (properties.count() > 0) return;
            properties.saveAll(List.of(
                property("Luxury Villa", "Guntur", "buy", "residential", "villa", 125, 2200, "₹1.25 Crore", "Featured", "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=88", List.of("3 Beds", "3 Baths", "2200 sq.ft"), LocalDate.of(2026, 8, 30)),
                property("Modern Apartment", "Vijayawada", "buy", "residential", "apartment", 78, 1350, "₹78 Lakhs", "New", "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=88", List.of("2 Beds", "2 Baths", "1350 sq.ft"), LocalDate.of(2026, 8, 31)),
                property("2 BHK Rental Apartment", "Guntur", "rent", "residential", "apartment", 18, 1100, "₹18,000 / month", "For Rent", "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=88", List.of("2 Beds", "2 Baths", "Semi-Furnished"), LocalDate.of(2026, 9, 1))
            ));
        };
    }

    private Property property(String title, String location, String mode, String category, String type, double price, double area, String priceLabel, String badge, String image, List<String> details, LocalDate postedDate) {
        Property property = new Property();
        property.setTitle(title); property.setLocation(location); property.setMode(mode); property.setCategory(category); property.setType(type);
        property.setPrice(price); property.setArea(area); property.setPriceLabel(priceLabel); property.setBadge(badge); property.setImage(image); property.setDetails(details); property.setPostedDate(postedDate);
        return property;
    }
}