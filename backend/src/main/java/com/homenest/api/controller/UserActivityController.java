package com.homenest.api.controller;

import com.homenest.api.model.*;
import com.homenest.api.repository.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api")
public class UserActivityController {
    private final UserRepository users;
    private final PropertyRepository properties;
    private final EnquiryRepository enquiries;
    private final ScheduledVisitRepository visits;

    public UserActivityController(UserRepository users, PropertyRepository properties, EnquiryRepository enquiries, ScheduledVisitRepository visits) {
        this.users = users; this.properties = properties; this.enquiries = enquiries; this.visits = visits;
    }

    @GetMapping("/me")
    public AuthController.UserResponse me(Authentication auth) { return userResponse(currentUser(auth)); }

    @GetMapping("/me/listings")
    public List<PropertyController.PropertyResponse> listings(Authentication auth) { return properties.findByOwner(currentUser(auth)).stream().map(this::propertyResponse).toList(); }

    @GetMapping("/me/favorites")
    public List<PropertyController.PropertyResponse> favorites(Authentication auth) { return currentUser(auth).getFavorites().stream().map(this::propertyResponse).toList(); }

    @PostMapping("/me/favorites/{propertyId}")
    public ResponseEntity<Void> addFavorite(@PathVariable Long propertyId, Authentication auth) {
        User user = currentUser(auth); Property property = properties.findById(propertyId).orElse(null);
        if (property == null) return ResponseEntity.notFound().build();
        user.getFavorites().add(property); users.save(user); return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/me/favorites/{propertyId}")
    public ResponseEntity<Void> removeFavorite(@PathVariable Long propertyId, Authentication auth) {
        User user = currentUser(auth); user.getFavorites().removeIf(property -> property.getId().equals(propertyId)); users.save(user); return ResponseEntity.noContent().build();
    }

    @PostMapping("/properties/{propertyId}/enquiries")
    public ResponseEntity<Enquiry> enquire(@PathVariable Long propertyId, @Valid @RequestBody EnquiryRequest request, Authentication auth) {
        Property property = properties.findById(propertyId).orElse(null); if (property == null) return ResponseEntity.notFound().build();
        Enquiry enquiry = new Enquiry(); enquiry.setCustomer(currentUser(auth)); enquiry.setProperty(property); enquiry.setName(request.name()); enquiry.setEmail(request.email()); enquiry.setPhone(request.phone()); enquiry.setMessage(request.message());
        return ResponseEntity.status(HttpStatus.CREATED).body(enquiries.save(enquiry));
    }

    @GetMapping("/me/enquiries")
    public List<Enquiry> enquiries(Authentication auth) { return enquiries.findByCustomerOrderByCreatedAtDesc(currentUser(auth)); }

    @PostMapping("/properties/{propertyId}/visits")
    public ResponseEntity<ScheduledVisit> schedule(@PathVariable Long propertyId, @Valid @RequestBody VisitRequest request, Authentication auth) {
        Property property = properties.findById(propertyId).orElse(null); if (property == null) return ResponseEntity.notFound().build();
        ScheduledVisit visit = new ScheduledVisit(); visit.setCustomer(currentUser(auth)); visit.setProperty(property); visit.setName(request.name()); visit.setPhone(request.phone()); visit.setVisitDate(request.visitDate()); visit.setVisitTime(request.visitTime()); visit.setNotes(request.notes());
        return ResponseEntity.status(HttpStatus.CREATED).body(visits.save(visit));
    }

    @GetMapping("/me/visits")
    public List<ScheduledVisit> visits(Authentication auth) { return visits.findByCustomerOrderByVisitDateAsc(currentUser(auth)); }

    private User currentUser(Authentication auth) { return users.findById(Long.valueOf(auth.getName())).orElseThrow(); }
    private AuthController.UserResponse userResponse(User user) { return new AuthController.UserResponse(user.getId(), user.getFullName(), user.getPhoneNumber(), user.getEmail(), user.getCreatedAt()); }
    private PropertyController.PropertyResponse propertyResponse(Property property) { return new PropertyController.PropertyResponse(property.getId(), property.getTitle(), property.getLocation(), property.getMode(), property.getCategory(), property.getType(), property.getPrice(), property.getPriceLabel(), property.getArea(), property.getDetails(), property.getBadge(), property.getImage(), property.getPostedDate(), property.getOwnerName(), property.getOwnerPhone()); }

    public record EnquiryRequest(@NotBlank String name, @NotBlank String email, @NotBlank String phone, @NotBlank String message) {}
    public record VisitRequest(@NotBlank String name, @NotBlank String phone, @NotNull LocalDate visitDate, @NotBlank String visitTime, String notes) {}
}
