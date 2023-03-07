package com.services;

import com.dtos.SortieDto;

import java.util.List;

public interface SortieService {
    /**
     * Sauvegarder une sortie
     */
    SortieDto saveSortie(SortieDto sortieDto);

    /**
     * Récupérer une sortie par son id
     */
    SortieDto getSortieById(int sortieId);

    /**
     * Supprimer une sortie par son identifiant
     */
    boolean deleteSortie(int sortieId);

    /**
     * Récuperer toutes les sorties
     */
    List<SortieDto> getAllSorties();
}
