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
     * Récupérer une Option par son id
     */
    ResultatDto getOptionById(int optionId);

    /**
     * Modifier une option par son id
     */
    ResultatDto updateOptionById(int optionId, OptionDto optionDto);

    /**
     * Supprimer une Option par son identifiant
     */
    ResultatDto deleteOption(int optionId);

    /**
     * Récuperer toutes les Options
     */
    ResultatDto getAllOptions();

    /**
     * Récuperer toutes les Options de la soirée dont l'identifiant est passée en paramètre
     */
    ResultatDto getOptionBySortieId(int sortieId);

    /**
     * Récuperer toutes les Options de la reservation dont l'identifiant est passée en paramètre
     */
    ResultatDto getOptionByReservationId(int reservationId);
}
