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
     * <p>Get all sortie in the system</p>
     * @return List<SortieDto>
     */
    @GetMapping
    public ResultatDto getOption() {
        return optionService.getAllOptions();
    }

    /**
     * Method to get the sortie based on the ID
     */
    @GetMapping("/sortie/{id}")
    public ResultatDto getOptionBySortieId(@PathVariable int id){
        return optionService.getOptionBySortieId(id);
    }

    /**
     * Method to get the sortie based on the ID
     */
    @GetMapping("/reservation/{id}")
    public ResultatDto getOptionByReservationId(@PathVariable int id){
        return optionService.getOptionByReservationId(id);
    }

    /**
     * Method to get the sortie based on the ID
     */
    @GetMapping("/{id}")
    public ResultatDto getOption(@PathVariable int id){
        return optionService.getOptionById(id);
    }

    /**
     * Create a new Sortie in the system
     */
    @PostMapping
    public ResultatDto saveOption(final @RequestBody OptionDto optionDto){
        return optionService.saveOption(optionDto);
    }

    /**
     * Update a sortie by it's id
     */
    @PutMapping("/{id}")
    public ResultatDto updateOption(@PathVariable int id,final @RequestBody OptionDto optionDto){
        return optionService.updateOptionById(id,optionDto);
    }

    /**
     * Delete a sortie by it's id
     */
    @DeleteMapping("/{id}")
    public ResultatDto deleteOption(@PathVariable int id){
        return optionService.deleteOption(id);
    }

}
