package com.services.impl;

import com.dtos.OptionDto;
import com.entities.Reservation;
import com.entities.Sortie;
import com.dtos.ResultatDto;
import com.entities.Option;
import com.repositories.OptionRepository;
import com.repositories.ReservationRepository;
import com.repositories.SortieRepository;
import com.services.OptionService;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.*;

@Service("optionService")
public class OptionServiceImpl implements OptionService {

    private final OptionRepository optionRepository;
    private final SortieRepository sortieRepository;
    private final ReservationRepository reservationRepository;

    public OptionServiceImpl(OptionRepository optionRepository, SortieRepository sortieRepository, ReservationRepository reservationRepository){
        this.optionRepository = optionRepository;
        this.sortieRepository = sortieRepository;
        this.reservationRepository = reservationRepository;
    }
    @Override
    public ResultatDto saveOption(OptionDto optionDto) {
        ResultatDto res = new ResultatDto();
        try{
            Option option = optionRepository.findById(optionDto.getIdOption()).orElseThrow(() -> new EntityNotFoundException("option not found"));
            res.setOk(false);
            res.setMessage("Identifiant déjà existant.");
        }catch (EntityNotFoundException e){
            boolean erreur = false;
            if(optionDto.getNomOption()==null || optionDto.getNomOption().length()==0 || optionDto.getIdSortie()==0){
                erreur=true;
                res.setOk(false);
                res.setMessage("Le nom et la soirée doivent être définit.");
            }
            if(!erreur){
                try{
                    Option option = optionDtoToEntity(optionDto);
                    option = optionRepository.save(option);
                    res.setOk(true);
                    res.setMessage("Option ajoutée.");
                    Set<Object> set = new HashSet<>();
                    set.add(this.optionEntityToDto(option));
                    res.setData(set);
                }catch(EntityNotFoundException e2){
                    res.setOk(false);
                    res.setMessage("La soirée définit n'existe pas.");
                }
            }
        }
        return res;
    }

    @Override
    public ResultatDto getOptionById(int optionId) {
        ResultatDto res = new ResultatDto();
        try{
            Option option = optionRepository.findById(optionId).orElseThrow(() -> new EntityNotFoundException("option not found"));
            res.setOk(true);
            res.setMessage("Option existante");
            Set<Object> set = new HashSet<>();
            set.add(this.optionEntityToDto(option));
            res.setData(set);
        }catch(EntityNotFoundException e){
            res.setOk(false);
            res.setMessage("Option inexistante");
        }
        return res;
    }

    @Override
    public ResultatDto updateOptionById(int optionId, OptionDto optionDto) {
        ResultatDto res = new ResultatDto();
        try{
            Option option = optionRepository.findById(optionId).orElseThrow(() -> new EntityNotFoundException("option not found"));
            boolean erreur = false;
            if(optionDto.getIdSortie()!=option.getIdSortie().getIdSortie()){
                   erreur = true;
                   res.setOk(false);
                   res.setMessage("Impossible de modifier la sortie d'une option.");
            }
            if(!erreur) {
                if (optionDto.getNomOption() != null && optionDto.getNomOption().length() != 0) {
                    option.setNomOption(optionDto.getNomOption());
                }
                option.setPrixOption(optionDto.getPrixOption());
                this.optionRepository.save(option);
                res.setOk(true);
                res.setMessage("Option modifiée");
                Set<Object> set = new HashSet<>();
                set.add(this.optionEntityToDto(option));
                res.setData(set);
            }
        }catch(EntityNotFoundException e){
            res.setOk(false);
            res.setMessage("Option inexistante.");
        }
        return res;
    }

    @Override
    public ResultatDto deleteOption(int optionId) {
        ResultatDto res = new ResultatDto();
        try{
            Option option = optionRepository.findById(optionId).orElseThrow(() -> new EntityNotFoundException("Option not found"));
            Iterator<Reservation> it = option.getReservationSet().iterator();
            while (it.hasNext()){
                Reservation r = it.next();
                r.getOptionSet().remove(option);
                this.reservationRepository.save(r);
            }
            this.optionRepository.deleteById(optionId);
            res.setOk(true);
            res.setMessage("Suppression réussi.");
        }catch (EntityNotFoundException e){
            res.setOk(false);
            res.setMessage("Option inexistant.");
        }
        return res;
    }

    @Override
    public ResultatDto getAllOptions() {
        ResultatDto res = new ResultatDto();
        Set<Object> optionsDtos = new HashSet<>();
        List<Option> options = optionRepository.findAll();
        options.forEach(option -> {
            optionsDtos.add(optionEntityToDto(option));
        });
        res.setOk(true);
        res.setMessage("Liste de toutes les options");
        res.setData(optionsDtos);
        return res;
    }

    @Override
    public ResultatDto getOptionBySortieId(int sortieId) {
        ResultatDto res = new ResultatDto();
        Set<Object> optionsDtos = new HashSet<>();
        try {
            Sortie s = this.sortieRepository.findById(sortieId).orElseThrow(() -> new EntityNotFoundException("sortie not found"));
            List<Option> options = optionRepository.findAll();
            options.forEach(option -> {
                if(option.getIdSortie().getIdSortie()==sortieId){
                    optionsDtos.add(optionEntityToDto(option));
                }
            });
            res.setOk(true);
            res.setMessage("Liste de toutes les options de la sortie + "+sortieId);
            res.setData(optionsDtos);
        }catch(EntityNotFoundException e){
            res.setOk(false);
            res.setMessage("Sortie inexistante");
        }
        return res;
    }

    @Override
    public ResultatDto getOptionByReservationId(int reservationId) {
        ResultatDto res = new ResultatDto();
        Set<Object> optionsDtos = new HashSet<>();
        try {
            Reservation resa = this.reservationRepository.findById(reservationId).orElseThrow(() -> new EntityNotFoundException("reservation not found"));
            List<Option> options = optionRepository.findAll();
            options.forEach(option -> {
                if(option.getReservationSet().contains(resa)){
                    optionsDtos.add(optionEntityToDto(option));
                }
            });
            res.setOk(true);
            res.setMessage("Liste de toutes les options de la réservation + "+reservationId);
            res.setData(optionsDtos);
        }catch(EntityNotFoundException e){
            res.setOk(false);
            res.setMessage("Reservation inexistante");
        }
        return res;
    }

    private OptionDto optionEntityToDto(Option option) {
        OptionDto optionDto = new OptionDto();
        optionDto.setIdOption(option.getIdOption());
        optionDto.setNomOption(option.getNomOption());
        optionDto.setPrixOption(option.getPrixOption());
        optionDto.setIdSortie(option.getIdSortie().getIdSortie());
        return optionDto;
    }

    private Option optionDtoToEntity(OptionDto optionDto) {
        Option option = new Option();
        option.setIdOption(optionDto.getIdOption());
        option.setNomOption(optionDto.getNomOption());
        option.setPrixOption(optionDto.getPrixOption());
        option.setIdSortie(this.sortieRepository.findById(optionDto.getIdSortie()).orElseThrow(() -> new EntityNotFoundException("sortie not found")));
        return option;
    }

}

