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
     * <p>Get all sortie in the system</p>
     * @return List<SortieDto>
     */
    @GetMapping
    public ResultatDto getSortie() {
        return sortieService.getAllSorties();
    }

    /**
     * Method to get the sortie based on the ID
     */
    @GetMapping("/{id}")
    public ResultatDto getSortie(@PathVariable int id){
        return sortieService.getSortieById(id);
    }

    /**
     * Create a new Sortie in the system
     */
    @PostMapping
    public ResultatDto saveSortie(final @RequestBody SortieDto sortieDto){
        return sortieService.saveSortie(sortieDto);
    }

    /**
     * Update a Sortie in the system
     */
    @PutMapping("/{id}")
    public ResultatDto updateSortie(@PathVariable int id, final @RequestBody SortieDto sortieDto){
        return sortieService.updateSortie(id,sortieDto);
    }

    /**
     * Delete a sortie by it's id
     */
    @DeleteMapping("/{id}")
    public ResultatDto deleteSortie(@PathVariable int id){
        return sortieService.deleteSortie(id);
    }

}
