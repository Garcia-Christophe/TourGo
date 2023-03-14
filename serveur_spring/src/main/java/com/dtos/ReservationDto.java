package com.dtos;

import com.entities.Commande;
import com.entities.Option;
import com.entities.Sortie;
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
