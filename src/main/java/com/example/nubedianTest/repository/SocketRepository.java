package com.example.nubedianTest.repository;

import com.example.nubedianTest.model.Socket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SocketRepository extends JpaRepository<Socket, Long> {

    List<Socket> findByDescription(String description);

    boolean existsProcessorByDescription(String description);
}
