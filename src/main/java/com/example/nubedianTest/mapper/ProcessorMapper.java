package com.example.nubedianTest.mapper;

import com.example.nubedianTest.dto.ProcessorDto;
import com.example.nubedianTest.model.Processor;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;


@Mapper(componentModel = "spring")
public interface ProcessorMapper  {

    ProcessorDto mapProcessorToDto(Processor processor);

    @InheritInverseConfiguration
    Processor mapDtoToProcessor(ProcessorDto processorDto);
}

