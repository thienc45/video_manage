package com.example.send.beapi.service;

import com.example.send.beapi.dto.request.SignupRequest;
import com.example.send.beapi.entity.Restream;
import com.example.send.beapi.entity.User;

import java.util.List;

public interface UserService  {

    User getUserById(Long id);

    List<User> getAllUser();

    void deleteUser(Long id);

    User updateUser(SignupRequest signupRequest, Long id);

}
