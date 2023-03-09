package com.controllers;

import com.dtos.UtilisateurDto;
import com.services.impl.UtilisateurServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/utilisateurs")
public class UtilisateurController {
    private final UtilisateurServiceImpl utilisateurService;

    public UtilisateurController(UtilisateurServiceImpl utilisateurService) {
        this.utilisateurService = utilisateurService;
    }

    /**
     * <p>Get all Utilisateur in the system</p>
     * @return List<UtilisateurDto>
     */
    @GetMapping
    public List<UtilisateurDto> getUtilisateur() {
        return utilisateurService.getAllUtilisateurs();
    }

    /**
     * Method to get the Utilisateur based on the ID
     */
    @GetMapping("/{id}")
    public UtilisateurDto getUtilisateur(@PathVariable String id){
        return utilisateurService.getUtilisateurById(id);
    }

    /**
     * Create a new Utilisateur in the system
     */
    @PostMapping
    public UtilisateurDto saveUtilisateur(final @RequestBody UtilisateurDto utilisateurDto){
        return utilisateurService.saveUtilisateur(utilisateurDto);
    }

    /**
     * Update a Utilisateur in the system
     */
    @PutMapping("/{id}")
    public UtilisateurDto updateUtilisateur(@PathVariable String id, final @RequestBody UtilisateurDto utilisateurDto){
        return utilisateurService.updateUtilisateurById(id ,utilisateurDto);
    }

    /**
     * Delete a Utilisateur by it's id
     */
    @DeleteMapping("/{id}")
    public Boolean deleteUtilisateur(@PathVariable String id){
        return utilisateurService.deleteUtilisateur(id);
    }

}
