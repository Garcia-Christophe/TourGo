package com.services;


import com.dtos.UtilisateurDto;

import java.util.List;

public interface UtilisateurService {
    /**
     * Sauvegarder une utilisateur
     */
    UtilisateurDto saveUtilisateur(UtilisateurDto utilisateurDto);

    /**
     * Récupérer une utilisateur par son id
     */
    UtilisateurDto getUtilisateurById(String utilisateurId);

    UtilisateurDto updateUtilisateurById(String utilisateurId, UtilisateurDto utilisateurDto);

    /**
     * Supprimer une utilisateur par son identifiant
     */
    boolean deleteUtilisateur(String utilisateurId);

    /**
     * Récuperer toutes les utilisateurs
     */
    List<UtilisateurDto> getAllUtilisateurs();
}