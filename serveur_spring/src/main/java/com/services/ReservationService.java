package com.services;


import com.dtos.ReservationDto;
import com.dtos.ResultatDto;

import java.util.List;

public interface ReservationService {
    /**
     * Sauvegarder une reservation
     */
    ResultatDto saveReservation(ReservationDto reservationDto);

    /**
     * Récupérer une reservation par son id
     */
    ResultatDto getReservationById(int reservationId);

    /**
     * Modifier une reservation par son id
     */
    ResultatDto updateReservationById(int reservationId, ReservationDto reservationDto);

    /**
     * Supprimer une reservation par son id
     */
    ResultatDto deleteReservation(int reservationId);

    /**
     * Récuperer toutes les reservations
     */
    ResultatDto getAllReservation();

    /**
     * Récuperer toutes les reservations d'une commande par son id
     */
    ResultatDto getReservetionByIdCommande(int id);
}