package com.example.send.beapi.service.impl;

import com.example.send.beapi.dto.request.SignupRequest;
import com.example.send.beapi.entity.Restream;
import com.example.send.beapi.entity.User;
import com.example.send.beapi.exeption.ResourceNotFound;
import com.example.send.beapi.repository.UserRepository;
import com.example.send.beapi.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public User getUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User Not Found"));
        return user ;
    }

    @Override
    public List<User> getAllUser() {
        List<User> listOfVideo = null;
        try {
            listOfVideo = userRepository.findAll();
            return listOfVideo;
        } catch (Exception e) {
            throw new ResourceNotFound("404", "i am sorry " + e.getMessage());
        }
    }

    @Override
    @Transactional
    public void deleteUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User Not Found"));
        userRepository.delete(user);
    }

    @Override
    public User updateUser(SignupRequest signupRequest, Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User Not Found"));
        user.setEmail(signupRequest.getEmail());
//        user.setRoles(signupRequest.getRole());
        return user;
    }
}
