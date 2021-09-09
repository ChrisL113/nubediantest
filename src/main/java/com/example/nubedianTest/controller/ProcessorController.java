package com.example.nubedianTest.controller;

import com.example.nubedianTest.dto.ProcessorDto;
import com.example.nubedianTest.model.Processor;
import com.example.nubedianTest.service.ProcessorService;
import lombok.AllArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/content")
@AllArgsConstructor
public class ProcessorController {
    private final ProcessorService processorService;

    @PostMapping("/create")
    public ResponseEntity createProcessor(
            @RequestBody ProcessorDto processorDto
    ) {
        boolean exist = processorService.createProcessor(processorDto);

        if(!exist){
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }
        else{
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                   "there is already a processor with that model");

        }

    }

    @GetMapping("/getAll")
    public ResponseEntity<List<ProcessorDto>> getAllProcessors() {
        List<ProcessorDto> processorList = processorService.getAllProcessors();
       if (processorList.isEmpty()) {
          return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
       }
        return ResponseEntity.status(HttpStatus.OK).body(processorList);
    }

    @PutMapping("/update")
    public ResponseEntity<String> editProcessor(
            @RequestBody ProcessorDto processorDto) {
        try {
            processorService.updateProcessor(processorDto);

        } catch (Exception exception) {
            return new ResponseEntity<>("Unexpected error occurred",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>("Processor successfully updated!",
                HttpStatus.OK);
    }

    @DeleteMapping("/delete/{processorId}")
    public ResponseEntity<String> deleteIndex(
            @PathVariable(value="processorId") Long processorId) {
//        try {

        System.out.println("hello there   " + processorId);
            processorService.deleteProcessor(processorId);

//        } catch (EmptyResultDataAccessException exception) {
//            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
//        } catch (Exception exception) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(null);
//        }
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }
}
