package com.controllers;

import com.dtos.ResultatDto;
import com.dtos.UtilisateurDto;
import com.services.impl.UtilisateurServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/utilisateurs")
@CrossOrigin(origins = "http://localhost:3001")
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
    public ResultatDto getUtilisateur() {
        return utilisateurService.getAllUtilisateurs();
    }

    /**
     * Method to get the Utilisateur based on the ID
     */
    @GetMapping("/{id}")
    public ResultatDto getUtilisateur(@PathVariable String id){
        return utilisateurService.getUtilisateurById(id);
    }

    /**
     * Create a new Utilisateur in the system
     */
    @PostMapping
    public ResultatDto saveUtilisateur(final @RequestBody UtilisateurDto utilisateurDto){
        return utilisateurService.saveUtilisateur(utilisateurDto);
    }

    /**
     * Update a Utilisateur in the system
     */
    @PutMapping("/{id}")
    public ResultatDto updateUtilisateur(@PathVariable String id, final @RequestBody UtilisateurDto utilisateurDto){
        return utilisateurService.updateUtilisateurById(id ,utilisateurDto);
    }

    /**
     * Delete a Utilisateur by it's id
     */
    @DeleteMapping("/{id}")
    public ResultatDto deleteUtilisateur(@PathVariable String id){
        return utilisateurService.deleteUtilisateur(id);
    }

}
