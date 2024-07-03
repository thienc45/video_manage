package com.example.send.beapi.repository;

import com.example.send.beapi.entity.Restream;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RestreamRepository extends JpaRepository<Restream, Long> {

}
