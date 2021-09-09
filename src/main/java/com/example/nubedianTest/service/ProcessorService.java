package com.example.nubedianTest.service;

import com.example.nubedianTest.dto.ProcessorDto;
import com.example.nubedianTest.mapper.ProcessorMapper;
import com.example.nubedianTest.model.Processor;
import com.example.nubedianTest.model.Socket;
import com.example.nubedianTest.repository.ProcessorRepository;
import com.example.nubedianTest.repository.SocketRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
@AllArgsConstructor
public class ProcessorService {
    private final ProcessorRepository processorRepository;
    private final SocketRepository socketRepository;
    private final ProcessorMapper processorMapper;

    @Transactional
    public boolean createProcessor(ProcessorDto processorDto) {//Crud


        if (!processorRepository.existsProcessorByModel(processorDto.getModel())) {

            Processor processor = new Processor();
            processor.setModel(processorDto.getModel());
            processor.setBrand(processorDto.getBrand());
            processor.setSocket(processorDto.getSocket());
            processor.setClockSpeed(processorDto.getClockSpeed());
            processor.setNumberOfCores(processorDto.getNumberOfCores());
            processor.setNumberOfThreads(processorDto.getNumberOfThreads());
            processor.setTDP(processorDto.getTDP());
            processor.setEUR(processorDto.getEUR());

            processorRepository.save(processor);

            return false;
        } else {

            return true;

        }

    }

    @Transactional(readOnly = true)
    public List<ProcessorDto> getAllProcessors() {//cRud
        return processorRepository.findAll().stream()
                .map(processorMapper::mapProcessorToDto).collect(toList());
    }

    @Transactional
    public void updateProcessor(ProcessorDto processorDto) {//crUd

        Processor auxProcessor =
                processorRepository.getById(processorDto.getProcessorId());
        Socket auxSocket =
                socketRepository.getById(processorDto.getSocket().getSocketId());

        auxProcessor.setBrand(processorDto.getBrand());
        auxProcessor.setModel(processorDto.getModel());
        auxProcessor.setEUR(processorDto.getEUR());
        auxProcessor.setTDP(processorDto.getTDP());
        auxProcessor.setNumberOfCores(processorDto.getNumberOfCores());
        auxProcessor.setNumberOfThreads(processorDto.getNumberOfThreads());
        auxProcessor.setClockSpeed(processorDto.getClockSpeed());
        auxProcessor.setSocket(auxSocket);

        processorRepository.save(auxProcessor);

    }

    @Transactional
    public void deleteProcessor(Long processorId) {//cruD

         processorRepository.deleteById(processorId);

    }

}
