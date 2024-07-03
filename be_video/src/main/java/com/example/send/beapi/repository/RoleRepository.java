package com.example.send.beapi.repository;


import com.example.send.beapi.entity.ERole;
import com.example.send.beapi.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
//
    Role findByNameContaining(ERole name);
}
