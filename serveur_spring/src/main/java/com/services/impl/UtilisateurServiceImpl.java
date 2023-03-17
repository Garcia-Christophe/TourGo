package com.services.impl;

import com.dtos.ResultatDto;
import com.dtos.UtilisateurDto;
import com.entities.*;
import com.repositories.*;
import com.services.UtilisateurService;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.*;

@Service("utilisateurService")
public class UtilisateurServiceImpl implements UtilisateurService {

    private final UtilisateurRepository utilisateurRepository;
    private final CommandeRepository commandeRepository;
    private final ReservationRepository reservationRepository;
    private final OptionRepository optionRepository;
    private final SortieRepository sortieRepository;
    private final CommentaireRepository commentaireRepository;

    public UtilisateurServiceImpl(UtilisateurRepository utilisateurRepository, CommandeRepository commandeRepository, ReservationRepository reservationRepository, OptionRepository optionRepository, SortieRepository sortieRepository, CommentaireRepository commentaireRepository){
        this.utilisateurRepository = utilisateurRepository;
        this.commandeRepository = commandeRepository;
        this.reservationRepository = reservationRepository;
        this.optionRepository = optionRepository;
        this.sortieRepository = sortieRepository;
        this.commentaireRepository = commentaireRepository;
    }
    @Override
    public ResultatDto saveUtilisateur(UtilisateurDto utilisateurDto) {
        UtilisateurDto utilisateurDtoRetourne = null;
        ResultatDto res = new ResultatDto();

        // Vérification de l'unicité du pseudo
        try {
            if(utilisateurDto.getPseudo()==null){
                res.setOk(false);
                res.setMessage("Le pseudo doit être défini.");
            }else{
                Utilisateur u = utilisateurRepository.findById(utilisateurDto.getPseudo()).orElseThrow(() -> new EntityNotFoundException("Utilisateur not found"));
                res.setOk(false);
                res.setMessage("Le pseudo est déjà pris.");
            }
        } catch (EntityNotFoundException e) {
            boolean erreur = false;

            // Vérification que le mot de passe, le nom, le prenom et le mail ne sont pas null
            if (utilisateurDto.getNom() == null || utilisateurDto.getNom().length() == 0 || utilisateurDto.getPrenom() == null || utilisateurDto.getPrenom().length() == 0 || utilisateurDto.getMail() == null || utilisateurDto.getMail().length() == 0 || utilisateurDto.getMdp() == null || utilisateurDto.getMdp().length() == 0) {
                res.setOk(false);
                res.setMessage("Le mot de passe, le nom, le prenom et/ou le mail ne sont pas définis.");
                erreur = true;
            }

            // Aucune erreur enregistrement de l'utilisateur
            if (!erreur) {
                Utilisateur utilisateur = utilisateurDtoToEntity(utilisateurDto);
                System.out.println("u : "+ utilisateur);
                utilisateur = utilisateurRepository.save(utilisateur);
                utilisateurDtoRetourne = utilisateurEntityToDto(utilisateur);
                res.setOk(true);
                res.setMessage("L'utilisateur est bien inscrit");
                Set<Object> set = new HashSet<>();
                set.add(utilisateurDtoRetourne);
                res.setData(set);
            }
        }
        return res;
    }

    @Override
    public ResultatDto getUtilisateurById(String utilisateurId) {
        ResultatDto res = new ResultatDto();
        try {
            Utilisateur utilisateur = utilisateurRepository.findById(utilisateurId).orElseThrow(() -> new EntityNotFoundException("Utilisateur not found"));
            Set<Object> set = new HashSet<>();
            set.add(this.utilisateurEntityToDto(utilisateur));
            res.setData(set);
            res.setOk(true);
            res.setMessage("Utilisateur existant");
        }catch (EntityNotFoundException e) {
            res.setOk(false);
            res.setMessage("Utilisateur inexistant");
        }
        return res;
    }

    @Override
    public ResultatDto updateUtilisateurById(String utilisateurId, UtilisateurDto utilisateurDto) {
        ResultatDto res = new ResultatDto();
        try{
            Utilisateur utilisateur = utilisateurRepository.findById(utilisateurId).orElseThrow(() -> new EntityNotFoundException("Utilisateur not found"));
            UtilisateurDto utilisateurDtoFinal = null;
            boolean erreur = false;
            //Vérification que le pseudo n'est pas modifier
            if(!utilisateur.getPseudo().equals(utilisateurDto.getPseudo())){
                res.setOk(false);
                res.setMessage("Le pseudo ne peut pas être modifié.");
                erreur=true;
            }
            if(!erreur) {
                //Vérification que le mot de passe n'est pas null
                if(utilisateurDto.getMdp()!=null && utilisateurDto.getMdp().length()>0 ){
                    //Changement du mot de passe
                    utilisateur.setMdp(utilisateurDto.getMdp());
                }
                //Vérification que le nom n'est pas null
                if(utilisateurDto.getNom()!=null && utilisateurDto.getNom().length()>0 ){
                    //Changement du nom
                    utilisateur.setNom(utilisateurDto.getNom());
                }
                //Vérification que le prenom n'est pas null
                if(utilisateurDto.getPrenom()!=null && utilisateurDto.getPrenom().length()>0 ){
                    //Changement du prenom
                    utilisateur.setPrenom(utilisateurDto.getPrenom());
                }
                //Vérification que le mail n'est pas null
                if(utilisateurDto.getMail()!=null && utilisateurDto.getMail().length()>0 ) {
                    //Changement du mail
                    utilisateur.setMail(utilisateurDto.getMail());
                }
                //Changement de la date de naissance
                utilisateur.setDateNaissance(utilisateurDto.getDateNaissance());
                utilisateurRepository.save(utilisateur);
                utilisateurDtoFinal = this.utilisateurEntityToDto(utilisateur);
                res.setOk(true);
                res.setMessage("Modification réussi.");
                Set<Object> set = new HashSet<>();
                set.add(utilisateurDtoFinal);
                res.setData(set);
            }
        }catch(EntityNotFoundException e){
            res.setOk(false);
            res.setMessage("Utilisateur inexistant.");
        }
        return res;
    }


    @Override
    public ResultatDto deleteUtilisateur(String utilisateurId) {
        ResultatDto res = new ResultatDto();
        try{
            Utilisateur utilisateur = utilisateurRepository.findById(utilisateurId).orElseThrow(() -> new EntityNotFoundException("Utilisateur not found"));
            Set<Commande> commandes = utilisateur.getCommandeSet();
            if(commandes!=null){
                Iterator<Commande> it = commandes.iterator();
                while (it.hasNext()){
                    Commande c = it.next();
                    it.remove();
                    CommandeServiceImpl csi = new CommandeServiceImpl(commandeRepository,utilisateurRepository,reservationRepository, optionRepository, sortieRepository);
                    csi.deleteCommande(c.getIdCommande());
                }
            }
            List<Commentaire> commentaires = this.commentaireRepository.findAll();
            commentaires.forEach(commentaire -> {
                if(commentaire.getPseudoUtilisateur().equals(utilisateurId)){
                    this.commentaireRepository.delete(commentaire);
                }
            });
            utilisateurRepository.deleteById(utilisateurId);
            res.setOk(true);
            res.setMessage("Suppression réussi.");
        }catch (EntityNotFoundException e){
            res.setOk(false);
            res.setMessage("Utilisateur inexistant.");
        }
        return res;
    }

    @Override
    public ResultatDto getAllUtilisateurs() {
        ResultatDto res = new ResultatDto();
        Set<Object> utilisateurDtos = new HashSet<>();
        List<Utilisateur> utilisateurs = utilisateurRepository.findAll();
        utilisateurs.forEach(utilisateur -> {
            utilisateurDtos.add(utilisateurEntityToDto(utilisateur));
        });
        res.setOk(true);
        res.setMessage("Liste de tous les utilisateurs.");
        res.setData(utilisateurDtos);
        return res;
    }

    private UtilisateurDto utilisateurEntityToDto(Utilisateur utilisateur) {
        UtilisateurDto utilisateurDto = new UtilisateurDto();
        utilisateurDto.setPseudo(utilisateur.getPseudo());
        utilisateurDto.setMdp(utilisateur.getMdp());
        utilisateurDto.setNom(utilisateur.getNom());
        utilisateurDto.setPrenom(utilisateur.getPrenom());
        utilisateurDto.setMail(utilisateur.getMail());
        utilisateurDto.setDateNaissance(utilisateur.getDateNaissance());
        return utilisateurDto;
    }

    private Utilisateur utilisateurDtoToEntity(UtilisateurDto utilisateurDto) {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setPseudo(utilisateurDto.getPseudo());
        utilisateur.setMdp(utilisateurDto.getMdp());
        utilisateur.setNom(utilisateurDto.getNom());
        utilisateur.setPrenom(utilisateurDto.getPrenom());
        utilisateur.setMail(utilisateurDto.getMail());
        utilisateur.setDateNaissance(utilisateurDto.getDateNaissance());
        return utilisateur;
    }



}

