package com.services;

import com.dtos.ResultatDto;
import com.dtos.SortieDto;

import java.util.List;

public interface SortieService {
    /**
     * Sauvegarder une sortie
     */
    ResultatDto saveSortie(SortieDto sortieDto);

    /**
     * Récupérer une sortie par son id
     */
    ResultatDto getSortieById(int sortieId);

    /**
     * Modifier une sortie par son id
     */
    ResultatDto updateSortie(int idSortie,SortieDto sortieDto);

    /**
     * Supprimer une sortie par son id
     */
    ResultatDto deleteSortie(int sortieId);

    /**
     * Récuperer toutes les sorties
     */
    ResultatDto getAllSorties();
}
