package com.example.send.beapi.service;

import com.example.send.beapi.entity.Restream;

import java.util.List;

public interface RestreamService {

    Restream saveRestream(Restream restream);

    Restream updateRestream(Long id, Restream restream);

    void deleteRestream(Long id);

    Restream getRestreamById(Long id);

    List<Restream> getAllRestreams();
}
