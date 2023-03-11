package com.services.impl;

import com.dtos.CommandeDto;
import com.dtos.ResultatDto;
import com.entities.Commande;
import com.entities.Reservation;
import com.repositories.ReservationRepository;
import com.repositories.UtilisateurRepository;
import com.services.CommandeService;
import com.repositories.CommandeRepository;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

@Service("commandeService")
public class CommandeServiceImpl implements CommandeService {
    private final CommandeRepository commandeRepository;
    private final UtilisateurRepository utilisateurRepository;
    private final ReservationRepository reservationRepository;

    public CommandeServiceImpl(CommandeRepository commandeRepository, UtilisateurRepository utilisateurRepository, ReservationRepository reservationRepository) {
        this.commandeRepository = commandeRepository;
        this.utilisateurRepository = utilisateurRepository;
        this.reservationRepository = reservationRepository;
    }

    @Override
    public ResultatDto saveCommande(CommandeDto commandeDto) {
        CommandeDto commandeDtoRetourne = null;
        ResultatDto res = new ResultatDto();

        // Vérification de l'unicité de l'id
        try {
            Commande c = commandeRepository.findById(commandeDto.getIdCommande()).orElseThrow(() -> new EntityNotFoundException("Commande not found"));
            res.setOk(false);
            res.setMessage("L'identifiant est déjà pris.");
        } catch (EntityNotFoundException e) {
            boolean erreur = false;

            // Vérification que l'utilisateur n'est pas null
            if (commandeDto.getPseudoUtilisateur() == null || commandeDto.getPseudoUtilisateur().length() == 0 ){                res.setOk(false);
                res.setOk(false);
                res.setMessage("L'utilisateur n'est pas définis.");
                erreur = true;
            }

            // Aucune erreur enregistrement de la commande
            if (!erreur) {
                try{
                    Commande c = this.commandeDtoToEntity(commandeDto);
                    c = this.commandeRepository.save(c);
                    commandeDtoRetourne= this.commandeEntityToDto(c);
                    res.setOk(true);
                    res.setMessage("Commande ajouté");
                    Set<Object> set = new HashSet<>();
                    set.add(commandeDtoRetourne);
                    res.setData(set);
                }catch (EntityNotFoundException err){
                    res.setOk(false);
                    res.setMessage("L'utilisateur définis n'existe pas.");
                }
            }
        }
        return res;
    }

    @Override
    public ResultatDto getCommandeById(int commandeId) {
        ResultatDto res = new ResultatDto();
        try{
            Commande c =  this.commandeRepository.findById(commandeId).orElseThrow(() -> new EntityNotFoundException("Commande not found"));
            res.setOk(true);
            res.setMessage("Commende existante");
            Set<Object> set = new HashSet<>();
            set.add(this.commandeEntityToDto(c));
            res.setData(set);
        }catch(EntityNotFoundException e){
            res.setOk(false);
            res.setMessage("Commande inexistante");
        }
        return res;
    }

    @Override
    public ResultatDto updateCommandeById(int commandeId, CommandeDto commandeDto) {
        ResultatDto res = new ResultatDto();
        try{
            Commande c =  this.commandeRepository.findById(commandeId).orElseThrow(() -> new EntityNotFoundException("Commande not found"));
            boolean erreur = false;
            if(commandeDto.getPseudoUtilisateur()!=null && !commandeDto.getPseudoUtilisateur().equals(c.getPseudoUtilisateur().getPseudo())){
                res.setOk(false);
                res.setMessage("Impossible de modifier l'utilisateur de la commande.");
                erreur=true;
            }
            if(!erreur){
                if(c.getDateCommande()!=null && commandeDto.getDateCommande()!=null && !c.getDateCommande().equals(commandeDto.getDateCommande())) {
                    res.setOk(false);
                    res.setMessage("Impossible de modifier la date de la commande.");
                    erreur = true;
                }
            }
            if(!erreur){
                if(commandeDto!=null){
                    c.setDateCommande(commandeDto.getDateCommande());
                }
                c=this.commandeRepository.save(c);
                CommandeDto commandeDto1 = this.commandeEntityToDto(c);
                res.setOk(true);
                res.setMessage("Commande modifier");
                Set<Object> set = new HashSet<>();
                set.add(commandeDto1);
                res.setData(set);
            }
        }catch (EntityNotFoundException e){
            res.setOk(false);
            res.setMessage("Commande inexistante");
        }
        return res;
    }

    @Override
    public ResultatDto deleteCommande(int commandeId) {
        ResultatDto res = new ResultatDto();
        try{
            Commande c =  this.commandeRepository.findById(commandeId).orElseThrow(() -> new EntityNotFoundException("Commande not found"));
            Iterator<Reservation> it = c.getReservationSet().iterator();
            while(it.hasNext()){
                this.reservationRepository.delete(it.next());
            }
            this.commandeRepository.delete(c);
            res.setOk(true);
            res.setMessage("Commande supprimé");
        }catch(EntityNotFoundException e){
            res.setOk(false);
            res.setMessage("Commande inexistante");
        }
        return res;
    }

    @Override
    public ResultatDto getAllCommande() {
        ResultatDto res = new ResultatDto();
        Set<Object> commandesDto = new HashSet<>();
        List<Commande> commandes = commandeRepository.findAll();
        commandes.forEach(commande -> {
            commandesDto.add(commandeEntityToDto(commande));
            System.out.println("test");
        });
        res.setOk(true);
        res.setMessage("Liste de toutes les commandes.");
        res.setData(commandesDto);
        return res;
    }

    private CommandeDto commandeEntityToDto(Commande commande) {
        CommandeDto commandeDto = new CommandeDto();
        commandeDto.setIdCommande(commande.getIdCommande());
        commandeDto.setPseudoUtilisateur(commande.getPseudoUtilisateur().getPseudo());
        commandeDto.setDateCommande(commande.getDateCommande());
        return commandeDto;
    }

    private Commande commandeDtoToEntity(CommandeDto commandeDto) {
        Commande commande = new Commande();
        commande.setIdCommande(commandeDto.getIdCommande());
        commande.setDateCommande(commandeDto.getDateCommande());
        commande.setPseudoUtilisateur(utilisateurRepository.findById(commandeDto.getPseudoUtilisateur()).orElseThrow(() -> new EntityNotFoundException("Utilisateur not found")));
        return commande;
    }
}