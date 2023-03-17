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
     * Récupérer tous les utilisateurs
     */
    @GetMapping
    public ResultatDto getUtilisateur() {
        return utilisateurService.getAllUtilisateurs();
    }

    /**
     * Récupérer l'utilisateur correspondant à l'id
     */
    @GetMapping("/{id}")
    public ResultatDto getUtilisateur(@PathVariable String id){
        return utilisateurService.getUtilisateurById(id);
    }

    /**
     * Enregister un nouvelle utilisateur
     */
    @PostMapping
    public ResultatDto saveUtilisateur(final @RequestBody UtilisateurDto utilisateurDto){
        return utilisateurService.saveUtilisateur(utilisateurDto);
    }

    /**
     * Modifier un utilisateur existant correspondant à l'id
     */
    @PutMapping("/{id}")
    public ResultatDto updateUtilisateur(@PathVariable String id, final @RequestBody UtilisateurDto utilisateurDto){
        return utilisateurService.updateUtilisateurById(id ,utilisateurDto);
    }

    /**
     * Supprimer un utilisateur existant correspondant à l'id
     */
    @DeleteMapping("/{id}")
    public ResultatDto deleteUtilisateur(@PathVariable String id){
        return utilisateurService.deleteUtilisateur(id);
    }

}
