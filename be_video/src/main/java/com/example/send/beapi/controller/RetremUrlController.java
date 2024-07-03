package com.example.send.beapi.controller;

import com.example.send.beapi.entity.Restream;
import com.example.send.beapi.service.RestreamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/restreamc")
public class RetremUrlController {
    @Autowired
    private RestreamService restreamService;

    @PostMapping
    public ResponseEntity<Restream> createRestream(@RequestBody Restream restream) {
        Restream createdRestream = restreamService.saveRestream(restream);
        return new ResponseEntity<>(createdRestream, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Restream> updateRestream(@PathVariable Long id, @RequestBody Restream restream) {
        Restream updatedRestream = restreamService.updateRestream(id, restream);
        if (updatedRestream != null) {
            return new ResponseEntity<>(updatedRestream, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRestream(@PathVariable Long id) {
        restreamService.deleteRestream(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Restream> getRestreamById(@PathVariable Long id) {
        Restream restream = restreamService.getRestreamById(id);
        if (restream != null) {
            return new ResponseEntity<>(restream, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping
    public ResponseEntity<List<Restream>> getAllRestreams() {
        List<Restream> restreams = restreamService.getAllRestreams();
        return new ResponseEntity<>(restreams, HttpStatus.OK);
    }
}
