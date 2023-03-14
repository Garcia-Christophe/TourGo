package com.controllers;

import com.dtos.CommandeDto;
import com.dtos.ReservationDto;
import com.dtos.ResultatDto;
import com.services.impl.ReservationServiceImpl;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reservations")
public class ReservationController {
    private final ReservationServiceImpl reservationService;

    public ReservationController(ReservationServiceImpl reservationService) {
        this.reservationService = reservationService;
    }

    /**
     * <p>Get all Réservations in the system</p>
     * @return List<ReservationDto>
     */
    @GetMapping
    public ResultatDto getReservations() {
        return reservationService.getAllReservation();
    }

    /**
     * Method to get the Reservation based on the ID
     */
    @GetMapping("/{id}")
    public ResultatDto getReservation(@PathVariable int id){
        return reservationService.getReservationById(id);
    }

    /**
     * Get a Reservation by it's commande id
     */
    @GetMapping("/commande/{id}")
    public ResultatDto getReservationByIdCommande(@PathVariable int id){
        return reservationService.getReservetionByIdCommande(id);
    }

    /**
     * Create a new reservation in the system
     */
    @PostMapping
    public ResultatDto saveReservation(final @RequestBody ReservationDto reservationDto){
        return reservationService.saveReservation(reservationDto);
    }

    /**
     * Update a Reservation in the system
     */
    @PutMapping("/{id}")
    public ResultatDto updateReservation(@PathVariable int id, final @RequestBody ReservationDto reservationDto){
        return reservationService.updateReservationById(id ,reservationDto);
    }

    /**
     * Delete a Reservation by it's id
     */
    @DeleteMapping("/{id}")
    public ResultatDto deleteReservation(@PathVariable int id){
        return reservationService.deleteReservation(id);
    }

}
