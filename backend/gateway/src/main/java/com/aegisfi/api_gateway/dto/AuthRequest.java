package com.aegisfi.api_gateway.dto;

import lombok.Data;

@Data
public class AuthRequest {
    private String username;
    private String password;
    private String role; // optional for login, required for registration
}
