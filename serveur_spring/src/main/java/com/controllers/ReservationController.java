package com.controllers;

import com.dtos.CommandeDto;
import com.dtos.ReservationDto;
import com.dtos.ResultatDto;
import com.services.impl.ReservationServiceImpl;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reservations")
@CrossOrigin(origins = "http://localhost:3001")
public class ReservationController {
    private final ReservationServiceImpl reservationService;

    public ReservationController(ReservationServiceImpl reservationService) {
        this.reservationService = reservationService;
    }

    /**
     * Récupérer toutes les réservations
     */
    @GetMapping
    public ResultatDto getReservations() {
        return reservationService.getAllReservation();
    }

    /**
     * Récupérer la réservation correspondant à l'id
     */
    @GetMapping("/{id}")
    public ResultatDto getReservation(@PathVariable int id){
        return reservationService.getReservationById(id);
    }

    /**
     * Récupérer toutes les réservations d'une commande correspondant à l'id
     */
    @GetMapping("/commande/{id}")
    public ResultatDto getReservationByIdCommande(@PathVariable int id){
        return reservationService.getReservetionByIdCommande(id);
    }

    /**
     * Enregistrer une nouvelle réservation
     */
    @PostMapping
    public ResultatDto saveReservation(final @RequestBody ReservationDto reservationDto){
        return reservationService.saveReservation(reservationDto);
    }

    /**
     * Modifier la réservation existante correspondant à l'id
     */
    @PutMapping("/{id}")
    public ResultatDto updateReservation(@PathVariable int id, final @RequestBody ReservationDto reservationDto){
        return reservationService.updateReservationById(id ,reservationDto);
    }

    /**
     * Supprimer la réservation existante correspondant à l'id
     */
    @DeleteMapping("/{id}")
    public ResultatDto deleteReservation(@PathVariable int id){
        return reservationService.deleteReservation(id);
    }

}
