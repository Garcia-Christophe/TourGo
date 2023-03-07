package com.controllers;

import com.dtos.SortieDto;
import com.services.impl.SortieServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/sorties")
public class SortieController {
    private final SortieServiceImpl sortieService;

    public SortieController(SortieServiceImpl sortieService) {
        this.sortieService = sortieService;
    }

    /**
     * <p>Get all sortie in the system</p>
     * @return List<SortieDto>
     */
    @GetMapping
    public List<SortieDto> getSortie() {
        return sortieService.getAllSorties();
    }

    /**
     * Method to get the sortie based on the ID
     */
    @GetMapping("/{id}")
    public SortieDto getSortie(@PathVariable int id){
        return sortieService.getSortieById(id);
    }

    /**
     * Create a new Sortie in the system
     */
    @PostMapping
    public SortieDto saveSortie(final @RequestBody SortieDto sortieDto){
        return sortieService.saveSortie(sortieDto);
    }

    /**
     * Delete a sortie by it's id
     */
    @DeleteMapping("/{id}")
    public Boolean deleteSortie(@PathVariable int id){
        return sortieService.deleteSortie(id);
    }

}
