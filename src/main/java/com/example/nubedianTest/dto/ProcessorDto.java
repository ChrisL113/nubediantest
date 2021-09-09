package com.example.nubedianTest.dto;

import com.example.nubedianTest.model.Socket;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProcessorDto {

    private long processorId;

    private String model;

    private String brand;

    private Socket socket;

    private String clockSpeed;

    private Long numberOfCores;

    private Long numberOfThreads;

    private Double TDP;

    private Double EUR;
}
