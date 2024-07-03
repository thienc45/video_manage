package com.example.send.beapi.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

public interface UserWithRolesReponse {
    Long getUserId();
    String getUsername();
    String getEmail();
    Integer getTrangThai();
    Set<String> getRoles();
}
