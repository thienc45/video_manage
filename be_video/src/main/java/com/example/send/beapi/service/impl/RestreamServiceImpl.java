package com.example.send.beapi.service.impl;

import com.example.send.beapi.dto.request.RestreamRequest;
import com.example.send.beapi.entity.Restream;
import com.example.send.beapi.exeption.ResourceNotFound;
import com.example.send.beapi.repository.RestreamRepository;
import com.example.send.beapi.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class RestreamServiceImpl {
    @Autowired
    RestreamRepository restreamRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserRepository userRepository;

    public Restream getVideosById(Long id) {
        Restream video = restreamRepository.findById(id).orElseThrow(() -> new ResourceNotFound("504","id is not present"));
        return video ;
    }

    public List<Restream> getAllRestreamS() {
        List<Restream> listOfVideo = null;
        try {
            listOfVideo = restreamRepository.findAll();
            return listOfVideo;
        } catch (Exception e) {
            throw new ResourceNotFound("404", "i am sorry " + e.getMessage());
        }
    }


    public Restream updatePost(Restream restreams, Long id) {
        Restream restream = restreamRepository.findById(id).orElseThrow(() -> new ResourceNotFound("501", "Id not found"));

        restream.setGioKetThuc(restreams.getGioKetThuc());
        restream.setGioBatDau(restreams.getGioBatDau());

        Restream updateRestream = restreamRepository.save(restream);
        return updateRestream;
    }

    public void deleteVideos(Long id) {
        Restream video = restreamRepository.findById(id).orElseThrow(() -> new ResourceNotFound("403", "video id not found"));
        this.restreamRepository.delete(video);
    }

    public RestreamRequest updateModel(RestreamRequest restreamRequest, Long id) {
        Restream video = restreamRepository.findById(id).orElseThrow(()-> new ResourceNotFound("501","Id not found"));
        restreamRequest.setId(id);
        video.setGioBatDau(restreamRequest.getGioBatDau());
        video.setGioKetThuc(restreamRequest.getGioBatDau());
        restreamRepository.save(video);
        return restreamRequest ;
    }

}
