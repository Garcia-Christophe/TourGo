package com.services;


import com.dtos.CommandeDto;
import com.dtos.ResultatDto;
import com.dtos.UtilisateurDto;

import java.util.List;

public interface CommandeService {
    /**
     * Sauvegarder une commande
     */
    ResultatDto saveCommande(CommandeDto commandeDto);

    /**
     * Récupérer une commande par son id
     */
    ResultatDto getCommandeById(int commandeId);

    /**
     * Modifier une commande par son id
     */
    ResultatDto updateCommandeById(int commandeId, CommandeDto commandeDto);

    /**
     * Supprimer une commande par son id
     */
    ResultatDto deleteCommande(int commandeId);

    /**
     * Récuperer toutes les commandes
     */
    ResultatDto getAllCommande();

    /**
     * Récuperer toutes les commandes d'un utilisateur par son pseudo
     */
    ResultatDto getCommandeByIdUtilisateur(String pseudo);
}