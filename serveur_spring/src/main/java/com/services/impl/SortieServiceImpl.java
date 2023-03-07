package com.services.impl;

import com.dtos.SortieDto;
import com.entities.Sortie;
import com.repositories.SortieRepository;
import com.services.SortieService;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
@Service("sortieService")
public class SortieServiceImpl implements SortieService {

    private final SortieRepository sortieRepository;

    public SortieServiceImpl(SortieRepository sortieRepository){
        this.sortieRepository = sortieRepository;
    }
    @Override
    public SortieDto saveSortie(SortieDto sortieDto) {
        return null;
    }

    @Override
    public SortieDto getSortieById(int sortieId) {
        Sortie sortie = sortieRepository.findById(sortieId).orElseThrow(() -> new EntityNotFoundException("Sortie not found"));
        return sortieEntityToDto(sortie);
    }

    @Override
    public boolean deleteSortie(int sortieId) {
        return false;
    }

    @Override
    public List<SortieDto> getAllSorties() {
        List<SortieDto> sortieDtos = new ArrayList<>();
        List<Sortie> sorties = sortieRepository.findAll();
        sorties.forEach(sortie -> {
            sortieDtos.add(sortieEntityToDto(sortie));
        });
        return sortieDtos;
    }

    private SortieDto sortieEntityToDto(Sortie sortie) {
        SortieDto sortieDto = new SortieDto();
        sortieDto.setIdSortie(sortie.getIdSortie());
        sortieDto.setNomSortie(sortie.getNomSortie());
        sortieDto.setPrixSortie(sortie.getPrixSortie());
        sortieDto.setDate(sortie.getDate());
        sortieDto.setHeure(sortie.getHeure());
        sortieDto.setDuree(sortie.getDuree());
        sortieDto.setLieu(sortie.getLieu());
        sortieDto.setImage(sortie.getImage());
        sortieDto.setNbInscrits(sortie.getNbInscrits());
        sortieDto.setNbPlaces(sortie.getNbPlaces());
        sortieDto.setNbVues(sortie.getNbVues());
        return sortieDto;
    }

    private Sortie sortieDtoToEntity(SortieDto sortieDto) {
        Sortie sortie = new Sortie();
        sortie.setIdSortie(sortieDto.getIdSortie());
        sortie.setNomSortie(sortieDto.getNomSortie());
        sortie.setPrixSortie(sortieDto.getPrixSortie());
        sortie.setDate(sortieDto.getDate());
        sortie.setHeure(sortieDto.getHeure());
        sortie.setDuree(sortieDto.getDuree());
        sortie.setLieu(sortieDto.getLieu());
        sortie.setImage(sortieDto.getImage());
        sortie.setNbInscrits(sortieDto.getNbInscrits());
        sortie.setNbPlaces(sortieDto.getNbPlaces());
        sortie.setNbVues(sortieDto.getNbVues());
        return sortie;
    }

}
