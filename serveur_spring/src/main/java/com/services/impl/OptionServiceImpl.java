package com.services.impl;

import com.dtos.OptionDto;
import com.entities.Reservation;
import com.entities.Sortie;
import com.dtos.ResultatDto;
import com.entities.Monoption;
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
        //Vérification de l'unicité de l'option
        try{
            Monoption option = optionRepository.findById(optionDto.getIdOption()).orElseThrow(() -> new EntityNotFoundException("option not found"));
            //Ecriture de la réponse
            res.setOk(false);
            res.setMessage("Identifiant déjà existant.");
        }catch (EntityNotFoundException e){
            boolean erreur = false;
            //Vérification que le nom et la sortie sont bien définie
            if(optionDto.getNomOption()==null || optionDto.getNomOption().length()==0 || optionDto.getIdSortie()==0){
                //Ecriture de la réponse
                erreur=true;
                res.setOk(false);
                res.setMessage("Le nom et la sortie doivent être définit.");
            }
            if(!erreur){
               //Vérification de l'existance de la sortie
                try{
                    Monoption option = optionDtoToEntity(optionDto);
                    //Enregistrement de l'option
                    option = optionRepository.save(option);
                    //Ecriture de la réponse
                    res.setOk(true);
                    res.setMessage("Option ajoutée.");
                    Set<Object> set = new HashSet<>();
                    set.add(this.optionEntityToDto(option));
                    res.setData(set);
                }catch(EntityNotFoundException e2){
                    //Ecriture de la réponse
                    res.setOk(false);
                    res.setMessage("La sortie définit n'existe pas.");
                }
            }
        }
        return res;
    }

    @Override
    public ResultatDto getOptionById(int optionId) {
        ResultatDto res = new ResultatDto();
        //Vérification de l'existance de l'option
        try{
            Monoption option = optionRepository.findById(optionId).orElseThrow(() -> new EntityNotFoundException("option not found"));
            //Ecriture de la réponse
            res.setOk(true);
            res.setMessage("Option existante");
            Set<Object> set = new HashSet<>();
            set.add(this.optionEntityToDto(option));
            res.setData(set);
        }catch(EntityNotFoundException e){
            //Ecriture de la réponse
            res.setOk(false);
            res.setMessage("Option inexistante");
        }
        return res;
    }

    @Override
    public ResultatDto updateOptionById(int optionId, OptionDto optionDto) {
        ResultatDto res = new ResultatDto();
        //Vérifcation de l'existance de l'option
        try{
            Monoption option = optionRepository.findById(optionId).orElseThrow(() -> new EntityNotFoundException("option not found"));
            boolean erreur = false;
            //Vérifcation de la non modification de la sortie
            if(optionDto.getIdSortie()!=option.getIdSortie().getIdSortie()){
                //Ecriture de la réponse
                   erreur = true;
                   res.setOk(false);
                   res.setMessage("Impossible de modifier la sortie d'une option.");
            }
            if(!erreur) {
                //Modification du nom si différent de null
                if (optionDto.getNomOption() != null && optionDto.getNomOption().length() != 0) {
                    option.setNomOption(optionDto.getNomOption());
                }
                //Modification du prix
                option.setPrixOption(optionDto.getPrixOption());
                //Enregistrement des modifcations de l'option
                this.optionRepository.save(option);
                //Ecriture de la réponse
                res.setOk(true);
                res.setMessage("Option modifiée");
                Set<Object> set = new HashSet<>();
                set.add(this.optionEntityToDto(option));
                res.setData(set);
            }
        }catch(EntityNotFoundException e){
            //Ecriture de la réponse
            res.setOk(false);
            res.setMessage("Option inexistante.");
        }
        return res;
    }

    @Override
    public ResultatDto deleteOption(int optionId) {
        ResultatDto res = new ResultatDto();
        //Vérification de l'existance de l'option
        try{
            Monoption option = optionRepository.findById(optionId).orElseThrow(() -> new EntityNotFoundException("Option not found"));
            //Suppression de l'option pour toutes les réservation la possedant
            Iterator<Reservation> it = option.getReservationSet().iterator();
            while (it.hasNext()){
                Reservation r = it.next();
                r.getOptionSet().remove(option);
                //Enregistrement de la modification de la réservation
                this.reservationRepository.save(r);
            }
            //Suppression de l'option
            this.optionRepository.deleteById(optionId);
            //Ecriture de la réponse
            res.setOk(true);
            res.setMessage("Suppression réussi.");
        }catch (EntityNotFoundException e){
            //Ecriture de la réponse
            res.setOk(false);
            res.setMessage("Option inexistant.");
        }
        return res;
    }

    @Override
    public ResultatDto getAllOptions() {
        ResultatDto res = new ResultatDto();
        Set<Object> optionsDtos = new HashSet<>();
        //Récupération de toutes les options
        List<Monoption> options = optionRepository.findAll();
        options.forEach(option -> {
            optionsDtos.add(optionEntityToDto(option));
        });
        //Ecriture de la réponse
        res.setOk(true);
        res.setMessage("Liste de toutes les options");
        res.setData(optionsDtos);
        return res;
    }

    @Override
    public ResultatDto getOptionBySortieId(int sortieId) {
        ResultatDto res = new ResultatDto();
        Set<Object> optionsDtos = new HashSet<>();
        //Vérification de l'existance de la sortie
        try {
            Sortie s = this.sortieRepository.findById(sortieId).orElseThrow(() -> new EntityNotFoundException("sortie not found"));
            //Récupération de toutes les options
            List<Monoption> options = optionRepository.findAll();
            options.forEach(option -> {
                //Récupération des options de la sortie
                if(option.getIdSortie().getIdSortie()==sortieId){
                    optionsDtos.add(optionEntityToDto(option));
                }
            });
            //Ecriture de la réponse
            res.setOk(true);
            res.setMessage("Liste de toutes les options de la sortie + "+sortieId);
            res.setData(optionsDtos);
        }catch(EntityNotFoundException e){
            //Ecriture de la réponse
            res.setOk(false);
            res.setMessage("Sortie inexistante");
        }
        return res;
    }

    @Override
    public ResultatDto getOptionByReservationId(int reservationId) {
        ResultatDto res = new ResultatDto();
        Set<Object> optionsDtos = new HashSet<>();
        //Vérification de l'existance de la réservation
        try {
            Reservation resa = this.reservationRepository.findById(reservationId).orElseThrow(() -> new EntityNotFoundException("reservation not found"));
            //Récupération de toutes les options
            List<Monoption> options = optionRepository.findAll();
            options.forEach(option -> {
                //Récupération de toutes les options de la réservation
                if(option.getReservationSet().contains(resa)){
                    optionsDtos.add(optionEntityToDto(option));
                }
            });
            //Ecriture de la réponse
            res.setOk(true);
            res.setMessage("Liste de toutes les options de la réservation + "+reservationId);
            res.setData(optionsDtos);
        }catch(EntityNotFoundException e){
            //Ecriture de la réponse
            res.setOk(false);
            res.setMessage("Reservation inexistante");
        }
        return res;
    }

    private OptionDto optionEntityToDto(Monoption option) {
        OptionDto optionDto = new OptionDto();
        optionDto.setIdOption(option.getIdOption());
        optionDto.setNomOption(option.getNomOption());
        optionDto.setPrixOption(option.getPrixOption());
        optionDto.setIdSortie(option.getIdSortie().getIdSortie());
        return optionDto;
    }

    private Monoption optionDtoToEntity(OptionDto optionDto) {
        Monoption option = new Monoption();
        option.setIdOption(optionDto.getIdOption());
        option.setNomOption(optionDto.getNomOption());
        option.setPrixOption(optionDto.getPrixOption());
        option.setIdSortie(this.sortieRepository.findById(optionDto.getIdSortie()).orElseThrow(() -> new EntityNotFoundException("sortie not found")));
        return option;
    }

}

