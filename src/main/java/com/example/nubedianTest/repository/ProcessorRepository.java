package com.example.nubedianTest.repository;

import com.example.nubedianTest.model.Processor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProcessorRepository
        extends JpaRepository<Processor, Long> {

    boolean existsProcessorByModel(String model);

//    @Query("select p from Processor p left join fetch p.socket")
//    Processor getByIdEager();


}
