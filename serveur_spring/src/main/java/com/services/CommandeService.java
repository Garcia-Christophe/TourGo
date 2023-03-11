package com.services;


import com.dtos.CommandeDto;
import com.dtos.ResultatDto;

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

    ResultatDto updateCommandeById(int commandeId, CommandeDto commandeDto);

    /**
     * Supprimer une commande par son identifiant
     */
    ResultatDto deleteCommande(int commandeId);

    /**
     * Récuperer toutes les commandes
     */
    ResultatDto getAllCommande();
}