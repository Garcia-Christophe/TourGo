package com.services.impl;

import com.dtos.ResultatDto;
import com.dtos.SortieDto;
import com.entities.Option;
import com.entities.Reservation;
import com.entities.Sortie;
import com.repositories.CommandeRepository;
import com.repositories.OptionRepository;
import com.repositories.ReservationRepository;
import com.repositories.SortieRepository;
import com.services.SortieService;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.*;

@Service("sortieService")
public class SortieServiceImpl implements SortieService {

    private final SortieRepository sortieRepository;
    private final ReservationRepository reservationRepository;
    private final CommandeRepository commandeRepository;
    private final OptionRepository optionRepository;

    public SortieServiceImpl(SortieRepository sortieRepository, ReservationRepository reservationRepository, CommandeRepository commandeRepository, OptionRepository optionRepository){
        this.sortieRepository = sortieRepository;
        this.reservationRepository = reservationRepository;
        this.commandeRepository = commandeRepository;
        this.optionRepository = optionRepository;
    }
    @Override
    public ResultatDto saveSortie(SortieDto sortieDto) {
        ResultatDto res = new ResultatDto();
        SortieDto sortieDtoRetourne = null;

        // Vérification de l'unicité de l'id
        try {
            Sortie s = sortieRepository.findById(sortieDto.getIdSortie()).orElseThrow(() -> new EntityNotFoundException("Sortie not found"));
            res.setOk(false);
            res.setMessage("L'identifiant est déjà pris.");
        }catch (EntityNotFoundException e){
            boolean erreur = false;
            //Verification qu'aucune information est manquante.
            if(sortieDto.getNomSortie()==null || sortieDto.getNomSortie().length()==0|| sortieDto.getDescriptionSortie()==null|| sortieDto.getDescriptionSortie()
                    .length()==0||sortieDto.getHeure()==null||sortieDto.getDate()==null||sortieDto.getDuree()==null||sortieDto.getDuree()==null||sortieDto.getImage()==null||sortieDto.getImage().length()==0||sortieDto.getLieu()==null||sortieDto.getLieu().length()==0){
                res.setOk(false);
                res.setMessage("Tous les champs doivent être remplis.");
                erreur = true;
            }
            if(!erreur){
                Sortie sortie = this.sortieDtoToEntity(sortieDto);
                sortie.setNbVues(0);
                sortie.setNbPlaces(0);
                sortie.setNbInscrits(0);
                this.sortieRepository.save(sortie);
                sortieDtoRetourne=this.sortieEntityToDto(sortie);
                res.setOk(true);
                res.setMessage("Sortie ajoutée.");
                Set<Object> set = new HashSet<>();
                set.add(sortieDtoRetourne);
                res.setData(set);
            }
        }
        return res;
    }

    @Override
    public ResultatDto getSortieById(int sortieId) {
        ResultatDto res = new ResultatDto();
        try{
            Sortie sortie = sortieRepository.findById(sortieId).orElseThrow(() -> new EntityNotFoundException("Sortie not found"));
            res.setOk(true);
            res.setMessage("La sortie existe.");
            Set<Object> set = new HashSet<>();
            set.add(sortieEntityToDto(sortie));
            res.setData(set);
        }catch(EntityNotFoundException e){
            res.setOk(false);
            res.setMessage("La sortie n'existe pas.");
        }
        return res;
    }

    @Override
    public ResultatDto updateSortie(int idSortie,SortieDto sortieDto) {
        ResultatDto res = new ResultatDto();
        SortieDto sortieDtoRetourne = null;
        try {
            Sortie sortie = sortieRepository.findById(idSortie).orElseThrow(() -> new EntityNotFoundException("Sortie not found"));
            if(sortieDto.getNomSortie()!=null && sortieDto.getNomSortie().length()!=0){
                sortie.setNomSortie(sortieDto.getNomSortie());
            }
            System.out.println("description : "+sortieDto.getDescriptionSortie().length());
            if(sortieDto.getDescriptionSortie()!=null && sortieDto.getDescriptionSortie().length()!=0){
                sortie.setDescriptionSortie(sortieDto.getDescriptionSortie());
            }
            if(sortieDto.getDate()!=null){
                sortie.setDate(sortieDto.getDate());
            }
            if(sortieDto.getHeure()!=null){
                sortie.setHeure(sortieDto.getHeure());
            }
            if(sortieDto.getDuree()!=null){
               sortie.setDuree(sortieDto.getDuree());
            }
            if( sortieDto.getImage()!=null && sortieDto.getImage().length()!=0) {
                sortie.setImage(sortieDto.getImage());
            }
            if(sortieDto.getLieu()!=null && sortieDto.getLieu().length()!=0){
                sortie.setLieu(sortieDto.getLieu());
            }
            if(sortieDto.getNbVues()!=0){
                System.out.println(sortie.getNbVues()+" : "+sortie.getNbVues()+1);
                sortie.setNbVues(sortie.getNbVues()+1);
            }
            boolean erreur = false;
            if(sortieDto.getNbPlaces()!=0){
                if(sortie.getNbInscrits()>sortieDto.getNbPlaces()){
                    erreur=true;
                    res.setOk(false);
                    res.setMessage("Le nombre d'inscrit est trop important pour diminuer le nombre de places.");
                }else{
                    sortie.setNbPlaces(sortieDto.getNbPlaces());
                }
            }
            if(!erreur){
                sortie.setPrixSortie(sortieDto.getPrixSortie());
                this.sortieRepository.save(sortie);
                sortieDtoRetourne=this.sortieEntityToDto(sortie);
                res.setOk(true);
                res.setMessage("Sortie modifiée.");
                Set<Object> set = new HashSet<>();
                set.add(sortieDtoRetourne);
                res.setData(set);
            }
        }catch (EntityNotFoundException e){
            res.setOk(false);
            res.setMessage("L'identifiant n'existe pas.");
        }
        return res;
    }

    @Override
    public ResultatDto deleteSortie(int sortieId) {
        ResultatDto res = new ResultatDto();
        try{
            Sortie sortie = sortieRepository.findById(sortieId).orElseThrow(() -> new EntityNotFoundException("Sortie not found"));
            Iterator<Reservation> itResa = sortie.getReservationSet().iterator();
            ReservationServiceImpl rsi = new ReservationServiceImpl(reservationRepository,commandeRepository,optionRepository,sortieRepository);
            while(itResa.hasNext()){
                Reservation resa = itResa.next();
                rsi.deleteReservation(resa.getIdReservation());
            }
            Iterator<Option> itOp = sortie.getOptionSet().iterator();
            OptionServiceImpl osp = new OptionServiceImpl(optionRepository);
            while(itOp.hasNext()){
                Option op = itOp.next();
                osp.deleteOption(op.getIdOption());
            }
            sortieRepository.delete(sortie);
            res.setOk(true);
            res.setMessage("Suppression réussi.");
        }catch (EntityNotFoundException e){
            res.setOk(false);
            res.setMessage("Sortie inexistant.");
        }
        return res;
    }

    @Override
    public ResultatDto getAllSorties() {
        ResultatDto res = new ResultatDto();
        Set<Object> sortieDtos = new HashSet<>();
        List<Sortie> sorties = sortieRepository.findAll();
        sorties.forEach(sortie -> {
            sortieDtos.add(sortieEntityToDto(sortie));
        });
        res.setOk(true);
        res.setMessage("Liste de toutes les soirées.");
        res.setData(sortieDtos);
        return res;
    }

    private SortieDto sortieEntityToDto(Sortie sortie) {
        SortieDto sortieDto = new SortieDto();
        sortieDto.setIdSortie(sortie.getIdSortie());
        sortieDto.setNomSortie(sortie.getNomSortie());
        sortieDto.setDescriptionSortie(sortie.getDescriptionSortie());
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
        sortie.setDescriptionSortie(sortieDto.getDescriptionSortie());
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
