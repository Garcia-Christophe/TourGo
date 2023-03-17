package com.services;


import com.dtos.ResultatDto;
import com.dtos.UtilisateurDto;

import java.util.List;

public interface UtilisateurService {
    /**
     * Sauvegarder un utilisateur
     */
    ResultatDto saveUtilisateur(UtilisateurDto utilisateurDto);

    /**
     * Récupérer un utilisateur par son id
     */
    ResultatDto getUtilisateurById(String utilisateurId);

    /**
     * Modifier un utilisateur par son id
     */
    ResultatDto updateUtilisateurById(String utilisateurId, UtilisateurDto utilisateurDto);

    /**
     * Supprimer un utilisateur par son id
     */
    ResultatDto deleteUtilisateur(String utilisateurId);

    /**
     * Récuperer tous les utilisateurs
     */
    ResultatDto getAllUtilisateurs();
}