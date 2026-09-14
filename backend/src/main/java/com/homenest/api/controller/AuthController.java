package com.homenest.api.controller;

import com.homenest.api.model.User;
import com.homenest.api.repository.UserRepository;
import com.homenest.api.security.TokenService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserRepository users;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    public AuthController(UserRepository users, PasswordEncoder passwordEncoder, TokenService tokenService) {
        this.users = users; this.passwordEncoder = passwordEncoder; this.tokenService = tokenService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        String email = request.email().trim().toLowerCase();
        if (users.existsByEmailIgnoreCase(email)) return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorResponse("An account with this email already exists."));
        User user = new User();
        user.setFullName(request.fullName().trim()); user.setPhoneNumber(request.phoneNumber().trim());
        user.setEmail(email); user.setPasswordHash(passwordEncoder.encode(request.password()));
        users.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(publicUser(user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        User user = users.findByEmailIgnoreCase(request.email().trim()).orElse(null);
        if (user == null || !passwordEncoder.matches(request.password(), user.getPasswordHash())) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Invalid email or password."));
        return ResponseEntity.ok(new AuthResponse(tokenService.create(user), publicUser(user)));
    }

    private UserResponse publicUser(User user) { return new UserResponse(user.getId(), user.getFullName(), user.getPhoneNumber(), user.getEmail(), user.getCreatedAt()); }
    public record RegisterRequest(@NotBlank String fullName, @NotBlank String phoneNumber, @Email @NotBlank String email, @Size(min = 6) String password) {}
    public record LoginRequest(@Email @NotBlank String email, @NotBlank String password) {}
    public record AuthResponse(String token, UserResponse user) {}
    public record UserResponse(Long id, String fullName, String phoneNumber, String email, java.time.Instant createdAt) {}
    public record ErrorResponse(String message) {}
}
