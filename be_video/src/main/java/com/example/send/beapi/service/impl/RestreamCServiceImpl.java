package com.example.send.beapi.service.impl;

import com.example.send.beapi.entity.Restream;
import com.example.send.beapi.repository.RestreamRepository;
import com.example.send.beapi.service.RestreamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RestreamCServiceImpl  implements RestreamService {
    @Autowired
    private RestreamRepository restreamRepository;

    @Override
    public Restream saveRestream(Restream restream) {
        return restreamRepository.save(restream);
    }

    @Override
    public Restream updateRestream(Long id, Restream restream) {
        Optional<Restream> existingRestream = restreamRepository.findById(id);
        if (existingRestream.isPresent()) {
            restream.setId(id);
            return restreamRepository.save(restream);
        }
        return null; // or throw an exception if not found
    }

    @Override
    public void deleteRestream(Long id) {
        restreamRepository.deleteById(id);
    }

    @Override
    public Restream getRestreamById(Long id) {
        return restreamRepository.findById(id).orElse(null);
    }

    @Override
    public List<Restream> getAllRestreams() {
        return restreamRepository.findAll();
    }
}
