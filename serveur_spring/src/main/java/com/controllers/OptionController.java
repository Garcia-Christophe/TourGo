package com.controllers;

import com.dtos.OptionDto;
import com.dtos.ResultatDto;
import com.services.impl.OptionServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/options")
@CrossOrigin(origins = "http://localhost:3001")
public class OptionController {
    private final OptionServiceImpl optionService;

    public OptionController(OptionServiceImpl optionService) {
        this.optionService = optionService;
    }

    /**
     * Récupérer toutes les options
     */
    @GetMapping
    public ResultatDto getOption() {
        return optionService.getAllOptions();
    }

    /**
     * Récupérer les options d'une sortie correspondant à l'id
     */
    @GetMapping("/sortie/{id}")
    public ResultatDto getOptionBySortieId(@PathVariable int id){
        return optionService.getOptionBySortieId(id);
    }

    /**
     * Récupérer les options d'une reservation correspondant à l'id
     */
    @GetMapping("/reservation/{id}")
    public ResultatDto getOptionByReservationId(@PathVariable int id){
        return optionService.getOptionByReservationId(id);
    }

    /**
     * Récupérer l'option correspondant à l'id
     */
    @GetMapping("/{id}")
    public ResultatDto getOption(@PathVariable int id){
        return optionService.getOptionById(id);
    }

    /**
     * Enregistrer une nouvelle option
     */
    @PostMapping
    public ResultatDto saveOption(final @RequestBody OptionDto optionDto){
        return optionService.saveOption(optionDto);
    }

    /**
     * Modifier l'option existante correspondante à l'id
     */
    @PutMapping("/{id}")
    public ResultatDto updateOption(@PathVariable int id,final @RequestBody OptionDto optionDto){
        return optionService.updateOptionById(id,optionDto);
    }

    /**
     * Supprimer l'option existante correspondante à l'id
     */
    @DeleteMapping("/{id}")
    public ResultatDto deleteOption(@PathVariable int id){
        return optionService.deleteOption(id);
    }

}
