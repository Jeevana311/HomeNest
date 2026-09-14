package com.homenest.api.security;

import com.homenest.api.model.User;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class TokenService {
    private final ConcurrentHashMap<String, Long> sessions = new ConcurrentHashMap<>();

    public String create(User user) {
        String token = UUID.randomUUID().toString();
        sessions.put(token, user.getId());
        return token;
    }

    public Long userId(String token) {
        return token == null ? null : sessions.get(token);
    }
}
