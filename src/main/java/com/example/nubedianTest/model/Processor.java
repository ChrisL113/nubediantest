package com.example.nubedianTest.model;

import lombok.*;
import org.hibernate.engine.internal.Cascade;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Processor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long processorId;

    @NotBlank(message = "Model cannot be empty or null ")
    private String model;

    @NotBlank(message = "Brand cannot be empty or null ")
    private String brand;

    @NotBlank(message = "ClockSpeed cannot be empty or null ")
    private String clockSpeed;

    private Long numberOfCores;

    private Long numberOfThreads;

    private Double TDP;

    private Double EUR;

    @EqualsAndHashCode.Exclude
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "socketId")
    private Socket socket;

}
