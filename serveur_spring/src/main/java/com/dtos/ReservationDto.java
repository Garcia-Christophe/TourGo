package com.dtos;

import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Data
public class ReservationDto {
    private int idReservation;
    private int nbPersonnes;
    private int idCommande;
    private int idSortie;
    private Set<Integer> idOptions;
}
