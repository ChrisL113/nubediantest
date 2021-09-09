package com.example.nubedianTest.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Socket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long socketId;

    @NotBlank(message = "description cannot be empty or null ")
    private String description;

    @EqualsAndHashCode.Exclude
    @JsonIgnore
    @OneToMany(mappedBy = "socket")
    private Set<Processor> processors;


}
