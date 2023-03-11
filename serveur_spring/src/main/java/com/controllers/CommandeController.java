package com.controllers;

import com.dtos.CommandeDto;
import com.dtos.ResultatDto;
import com.services.impl.CommandeServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/commandes")
public class CommandeController {
    private final CommandeServiceImpl commandeService;

    public CommandeController(CommandeServiceImpl commandeService) {
        this.commandeService = commandeService;
    }

    /**
     * <p>Get all Commande in the system</p>
     * @return List<CommandeDto>
     */
    @GetMapping
    public ResultatDto getCommande() {
        return commandeService.getAllCommande();
    }

    /**
     * Method to get the Commande based on the ID
     */
    @GetMapping("/{id}")
    public ResultatDto getCommande(@PathVariable int id){
        return commandeService.getCommandeById(id);
    }

    /**
     * Create a new Commande in the system
     */
    @PostMapping
    public ResultatDto saveCommande(final @RequestBody CommandeDto commandeDto){
        return commandeService.saveCommande(commandeDto);
    }

    /**
     * Update a Commande in the system
     */
    @PutMapping("/{id}")
    public ResultatDto updateCommande(@PathVariable int id, final @RequestBody CommandeDto commandeDto){
        return commandeService.updateCommandeById(id ,commandeDto);
    }

    /**
     * Delete a Commande by it's id
     */
    @DeleteMapping("/{id}")
    public ResultatDto deleteCommande(@PathVariable int id){
        return commandeService.deleteCommande(id);
    }

}
