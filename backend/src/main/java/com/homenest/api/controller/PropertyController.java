package com.homenest.api.controller;

import com.homenest.api.model.Property;
import com.homenest.api.model.User;
import com.homenest.api.repository.PropertyRepository;
import com.homenest.api.repository.UserRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/properties")
public class PropertyController {
    private final PropertyRepository properties;
    private final UserRepository users;

    public PropertyController(PropertyRepository properties, UserRepository users) { this.properties = properties; this.users = users; }

    @GetMapping
    public List<PropertyResponse> find(@RequestParam(required = false) String mode, @RequestParam(required = false) String category,
                                       @RequestParam(required = false) String location, @RequestParam(required = false) String type) {
        return properties.findAll().stream()
            .filter(property -> blank(mode) || property.getMode().equalsIgnoreCase(mode))
            .filter(property -> blank(category) || category.equalsIgnoreCase("all") || property.getCategory().equalsIgnoreCase(category))
            .filter(property -> blank(location) || property.getLocation().toLowerCase().contains(location.toLowerCase()))
            .filter(property -> blank(type) || property.getType().equalsIgnoreCase(type))
            .map(this::response).toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PropertyResponse> get(@PathVariable Long id) {
        return properties.findById(id).map(property -> ResponseEntity.ok(response(property))).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<PropertyResponse> create(@Valid @RequestBody PropertyRequest request, Authentication authentication) {
        Property property = new Property();
        apply(property, request);
        User owner = currentUser(authentication);
        property.setOwner(owner); property.setOwnerName(owner.getFullName()); property.setOwnerPhone(owner.getPhoneNumber());
        property.setPostedDate(LocalDate.now());
        return ResponseEntity.status(HttpStatus.CREATED).body(response(properties.save(property)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PropertyResponse> update(@PathVariable Long id, @Valid @RequestBody PropertyRequest request, Authentication authentication) {
        return properties.findById(id).map(property -> {
            if (!property.getOwner().getId().equals(currentUser(authentication).getId())) return null;
            apply(property, request); return response(properties.save(property));
        }).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.FORBIDDEN).build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id, Authentication authentication) {
        Property property = properties.findById(id).orElse(null);
        if (property == null) return ResponseEntity.notFound().build();
        if (property.getOwner() == null || !property.getOwner().getId().equals(currentUser(authentication).getId())) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        properties.delete(property); return ResponseEntity.noContent().build();
    }

    private void apply(Property property, PropertyRequest request) {
        property.setTitle(request.title()); property.setLocation(request.location()); property.setMode(request.mode()); property.setCategory(request.category());
        property.setType(request.type()); property.setPrice(request.price()); property.setArea(request.area()); property.setPriceLabel(request.priceLabel());
        property.setBadge(request.badge()); property.setImage(request.image()); property.setDetails(request.details() == null ? List.of() : request.details());
    }
    private User currentUser(Authentication authentication) { return users.findById(Long.valueOf(authentication.getName())).orElseThrow(); }
    private PropertyResponse response(Property property) { return new PropertyResponse(property.getId(), property.getTitle(), property.getLocation(), property.getMode(), property.getCategory(), property.getType(), property.getPrice(), property.getPriceLabel(), property.getArea(), property.getDetails(), property.getBadge(), property.getImage(), property.getPostedDate(), property.getOwnerName(), property.getOwnerPhone()); }
    private boolean blank(String value) { return value == null || value.isBlank(); }

    public record PropertyRequest(@NotBlank String title, @NotBlank String location, @NotBlank String mode, @NotBlank String category, @NotBlank String type, @Positive double price, @Positive double area, String priceLabel, String badge, String image, List<String> details) {}
    public record PropertyResponse(Long id, String title, String location, String mode, String category, String type, double price, String priceLabel, double area, List<String> details, String badge, String image, LocalDate postedDate, String ownerName, String ownerPhone) {}
}
