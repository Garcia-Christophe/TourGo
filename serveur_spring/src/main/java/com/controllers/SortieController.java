package com.controllers;

import com.dtos.ResultatDto;
import com.dtos.SortieDto;
import com.services.impl.SortieServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/sorties")
@CrossOrigin(origins = "http://localhost:3001")
public class SortieController {
    private final SortieServiceImpl sortieService;

    public SortieController(SortieServiceImpl sortieService) {
        this.sortieService = sortieService;
    }

    /**
     * Récupérer toutes les sorties
     */
    @GetMapping
    public ResultatDto getSortie() {
        return sortieService.getAllSorties();
    }

    /**
     * Récupérer la sortie correspondant à l'id
     */
    @GetMapping("/{id}")
    public ResultatDto getSortie(@PathVariable int id){
        return sortieService.getSortieById(id);
    }

    /**
     * Enregistrer une nouvelle sortie
     */
    @PostMapping
    public ResultatDto saveSortie(final @RequestBody SortieDto sortieDto){
        return sortieService.saveSortie(sortieDto);
    }

    /**
     * Modifier une sortie existante correspondant à l'id
     */
    @PutMapping("/{id}")
    public ResultatDto updateSortie(@PathVariable int id, final @RequestBody SortieDto sortieDto){
        return sortieService.updateSortie(id,sortieDto);
    }

    /**
     * Supprimer une sortie existante correspondant à l'id
     */
    @DeleteMapping("/{id}")
    public ResultatDto deleteSortie(@PathVariable int id){
        return sortieService.deleteSortie(id);
    }

}
