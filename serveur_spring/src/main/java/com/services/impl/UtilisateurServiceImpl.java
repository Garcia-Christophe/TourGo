package com.services.impl;

import com.dtos.SortieDto;
import com.dtos.UtilisateurDto;
import com.entities.*;
import com.repositories.CommandeRepository;
import com.repositories.UtilisateurRepository;
import com.services.UtilisateurService;
import org.springframework.stereotype.Service;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import javax.persistence.NoResultException;
import java.util.*;

@Service("utilisateurService")
public class UtilisateurServiceImpl implements UtilisateurService {

    private final UtilisateurRepository utilisateurRepository;
    private final CommandeRepository commandeRepository;

    public UtilisateurServiceImpl(UtilisateurRepository utilisateurRepository,CommandeRepository commandeRepository){
        this.utilisateurRepository = utilisateurRepository;
        this.commandeRepository = commandeRepository;
    }
     @Override
    public UtilisateurDto saveUtilisateur(UtilisateurDto utilisateurDto) {
        UtilisateurDto utilisateurDtoRetourne = null;
        try {
            // Vérification de l'unicité du pseudo
            UtilisateurDto utilisateurExistant = this.getUtilisateurById(utilisateurDto.getPseudo());
            throw new EntityExistsException("Le pseudo est déjà utilisé.");
        } catch (EntityNotFoundException e) {
            // Vérification que le mot de passe, le nom, le prenom et le mail ne sont pas null
            if(utilisateurDto.getNom()==null || utilisateurDto.getNom().length()==0 || utilisateurDto.getPrenom()==null || utilisateurDto.getPrenom().length()==0  || utilisateurDto.getMail()==null || utilisateurDto.getMail().length()==0 || utilisateurDto.getMdp()==null || utilisateurDto.getMdp().length()==0 ){
                throw new NoResultException("Le mot de passe, le nom, le prenom et/ou le mail ne sont pas définit.");
            }
            // Aucune erreurn enregistrement de l'utilisateur
            Utilisateur utilisateur = utilisateurDtoToEntity(utilisateurDto);
            utilisateur = utilisateurRepository.save(utilisateur);
            utilisateurDtoRetourne = utilisateurEntityToDto(utilisateur);
        }
        return utilisateurDtoRetourne;
    }

    @Override
    public UtilisateurDto getUtilisateurById(String utilisateurId) {
        Utilisateur utilisateur = utilisateurRepository.findById(utilisateurId).orElseThrow(() -> new EntityNotFoundException("Utilisateur not found"));
        return utilisateurEntityToDto(utilisateur);
    }

    @Override
    public UtilisateurDto updateUtilisateurById(String utilisateurId, UtilisateurDto utilisateurDto) {
        Utilisateur utilisateur = utilisateurRepository.findById(utilisateurId).orElseThrow(() -> new EntityNotFoundException("Utilisateur not found"));
        UtilisateurDto utilisateurDtoFinal = null;
        //Vérification que le pseudo n'est pas modifier
        if(!utilisateur.getPseudo().equals(utilisateurDto.getPseudo())){
            throw new NoResultException("Le pseudo ne peut pas être modifié.");
        }
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
        return utilisateurDtoFinal;
    }


    @Override
    public boolean deleteUtilisateur(String utilisateurId) {
        Utilisateur utilisateur = utilisateurDtoToEntity(this.getUtilisateurById(utilisateurId));
        Set<Commande> commandes = utilisateur.getCommandeSet();
        if(commandes!=null){
            Iterator<Commande> it = commandes.iterator();
            while (it.hasNext()){
                Commande c = it.next();
                commandeRepository.deleteById(c.getIdCommande());
            }
        }
        utilisateurRepository.deleteById(utilisateurId);
        return true;
    }

    @Override
    public List<UtilisateurDto> getAllUtilisateurs() {
        List<UtilisateurDto> utilisateurDtos = new ArrayList<>();
        List<Utilisateur> utilisateurs = utilisateurRepository.findAll();
        utilisateurs.forEach(utilisateur -> {
            utilisateurDtos.add(utilisateurEntityToDto(utilisateur));
        });
        return utilisateurDtos;
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

