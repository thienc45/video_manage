package com.example.send.beapi.repository;

import com.example.send.beapi.dto.response.UserWithRolesReponse;
import com.example.send.beapi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    @Query(value = "SELECT u.id as userId, u.username, u.email, u.trang_thai as trangThai, r.name as roles " +
            "FROM users u " +
            "JOIN user_roles ur ON u.id = ur.user_id " +
            "JOIN roles r ON ur.role_id = r.id", nativeQuery = true)
    List<UserWithRolesReponse> findAllUsersWithRoles();
}
