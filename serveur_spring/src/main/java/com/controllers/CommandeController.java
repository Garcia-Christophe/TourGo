package com.controllers;

import com.dtos.CommandeDto;
import com.dtos.ResultatDto;
import com.dtos.UtilisateurDto;
import com.services.impl.CommandeServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/commandes")
@CrossOrigin(origins = "http://localhost:3001")
public class CommandeController {
    private final CommandeServiceImpl commandeService;

    public CommandeController(CommandeServiceImpl commandeService) {
        this.commandeService = commandeService;
    }

    /**
     * Récupérer toutes les commandes
     */
    @GetMapping
    public ResultatDto getCommande() {
        return commandeService.getAllCommande();
    }

    /**
     * Récupérer la commande correspondant à l'id
     */
    @GetMapping("/{id}")
    public ResultatDto getCommande(@PathVariable int id){
        return commandeService.getCommandeById(id);
    }

    /**
     * Récupérer les commandes d'un utilisateur correspondant à l'id
     */
    @GetMapping("/utilisateur/{pseudo}")
    public ResultatDto getCommandeByIdUtilisateur(@PathVariable String pseudo){
        return commandeService.getCommandeByIdUtilisateur(pseudo);
    }

    /**
     * Enregistrer une nouvelle commande
     */
    @PostMapping
    public ResultatDto saveCommande(final @RequestBody CommandeDto commandeDto){
        return commandeService.saveCommande(commandeDto);
    }

    /**
     * Modifier une commande existante
     */
    @PutMapping("/{id}")
    public ResultatDto updateCommande(@PathVariable int id, final @RequestBody CommandeDto commandeDto){
        return commandeService.updateCommandeById(id ,commandeDto);
    }

    /**
     * Supprimer une commande existante
     */
    @DeleteMapping("/{id}")
    public ResultatDto deleteCommande(@PathVariable int id){
        return commandeService.deleteCommande(id);
    }

}
