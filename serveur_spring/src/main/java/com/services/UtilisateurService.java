package com.services;


import com.dtos.ResultatDto;
import com.dtos.UtilisateurDto;

import java.util.List;

public interface UtilisateurService {
    /**
     * Sauvegarder une utilisateur
     */
    ResultatDto saveUtilisateur(UtilisateurDto utilisateurDto);

    /**
     * Récupérer une utilisateur par son id
     */
    ResultatDto getUtilisateurById(String utilisateurId);

    ResultatDto updateUtilisateurById(String utilisateurId, UtilisateurDto utilisateurDto);

    /**
     * Supprimer une utilisateur par son identifiant
     */
    ResultatDto deleteUtilisateur(String utilisateurId);

    /**
     * Récuperer toutes les utilisateurs
     */
    ResultatDto getAllUtilisateurs();
}