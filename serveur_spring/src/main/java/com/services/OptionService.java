package com.services;

import com.dtos.OptionDto;
import com.dtos.ResultatDto;

import java.util.List;

public interface OptionService {
    /**
     * Sauvegarder une Option
     */
    ResultatDto saveOption(OptionDto optionDto);

    /**
     * Récupérer une option par son id
     */
    ResultatDto getOptionById(int optionId);

    /**
     * Modifier une option par son id
     */
    ResultatDto updateOptionById(int optionId, OptionDto optionDto);

    /**
     * Supprimer une option par son id
     */
    ResultatDto deleteOption(int optionId);

    /**
     * Récuperer toutes les options
     */
    ResultatDto getAllOptions();

    /**
     * Récupérer toutes les options d'une sortie par son id
     */
    ResultatDto getOptionBySortieId(int sortieId);

    /**
     * Récupérer toutes les options d'une réservation par son id
     */
    ResultatDto getOptionByReservationId(int reservationId);
}
