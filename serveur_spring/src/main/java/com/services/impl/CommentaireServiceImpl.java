package com.services.impl;

import com.dtos.CommentaireDto;
import com.dtos.ResultatDto;
import com.dtos.SortieDto;
import com.entities.*;
import com.entities.Sortie;
import com.repositories.CommentaireRepository;
import com.repositories.SortieRepository;
import com.repositories.UtilisateurRepository;
import com.services.CommentaireService;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

@Service("commentaireService")
public class CommentaireServiceImpl implements CommentaireService {
    private final CommentaireRepository commentaireRepository;
    private final SortieRepository sortieRepository;
    private final UtilisateurRepository utilisateurRepository;

    public CommentaireServiceImpl(CommentaireRepository commentaireRepository, SortieRepository sortieRepository, UtilisateurRepository utilisateurRepository) {
        this.commentaireRepository = commentaireRepository;
        this.sortieRepository = sortieRepository;
        this.utilisateurRepository = utilisateurRepository;
    }

    @Override
    public ResultatDto saveCommentaire(CommentaireDto commentaireDto) {
        CommentaireDto commentaireDtoRetourne = null;
        ResultatDto res = new ResultatDto();
        boolean erreur = false;
        // Vérification que l'utilisateur n'est pas null
        if (commentaireDto.getPseudoUtilisateur() == null || commentaireDto.getPseudoUtilisateur().length() == 0 ){                res.setOk(false);
            res.setOk(false);
            res.setMessage("L'utilisateur n'est pas définis.");
            erreur = true;
        }
        if (!erreur && commentaireDto.getIdSortie()== 0 ){
            res.setOk(false);
            res.setMessage("La sortie n'est pas définis.");
            erreur = true;
        }
        // Aucune erreur enregistrement de la commande
        if (!erreur) {
            try{
                Sortie s = this.sortieRepository.findById(commentaireDto.getIdSortie()).orElseThrow(() -> new EntityNotFoundException("Soiree not found"));
                try{
                    Utilisateur u = this.utilisateurRepository.findById(commentaireDto.getPseudoUtilisateur()).orElseThrow(() -> new EntityNotFoundException("Utilisateur not found"));
                    Commentaire c = this.commentaireDtoToEntity(commentaireDto);
                    c = this.commentaireRepository.save(c);
                    commentaireDtoRetourne= this.commentaireEntityToDto(c);
                    res.setOk(true);
                    res.setMessage("Commentaire ajouté");
                    Set<Object> set = new HashSet<>();
                    set.add(commentaireDtoRetourne);
                    res.setData(set);
                }catch (EntityNotFoundException e){
                    res.setOk(false);
                    res.setMessage("L'utilisateur définis n'existe pas.");
                }
            }catch (EntityNotFoundException err){
                res.setOk(false);
                res.setMessage("La soirée définis n'existe pas.");
            }
        }
        return res;
    }

    @Override
    public ResultatDto getCommentaireById(String objId) {
        ResultatDto res = new ResultatDto();
        try {
            ObjectId objectId = new ObjectId(objId);
            Commentaire c = this.commentaireRepository.findById(objectId).orElseThrow(() -> new EntityNotFoundException("Commentaire not found"));
            res.setOk(true);
            res.setMessage("Commentaire existant");
            Set<Object> set = new HashSet<>();
            set.add(this.commentaireEntityToDto(c));
            res.setData(set);
        }catch(EntityNotFoundException e){
            res.setOk(false);
            res.setMessage("Commentaire inexistant");
        }
        return res;
    }

    @Override
    public ResultatDto updateCommentaireById(String objId, CommentaireDto commentaireDto) {
        ResultatDto res = new ResultatDto();
        try {
            ObjectId objectId = new ObjectId(objId);
            Commentaire commentaire = commentaireRepository.findById(objectId).orElseThrow(() -> new EntityNotFoundException("Commentaire not found"));
            boolean erreur = false;
            if(commentaireDto.getIdSortie()!=0 && commentaireDto.getIdSortie()!=commentaire.getIdSortie()){
                erreur=true;
                res.setOk(false);
                res.setMessage("Impossible de modifier la sortie");
            }
            if(!erreur && !commentaireDto.getPseudoUtilisateur().equals(commentaire.getPseudoUtilisateur())){
                erreur=true;
                res.setOk(false);
                res.setMessage("Impossible de modifier l'utilisateur");
            }
            if(!erreur && commentaireDto.getImages()!=null){
                commentaire.setImages(commentaireDto.getImages());
            }
            if(!erreur && commentaireDto.getCommentaire()!=null){
                commentaire.setCommentaire(commentaireDto.getCommentaire());
            }
            if(!erreur && commentaireDto.getNote()!=0){
                commentaire.setNote(commentaireDto.getNote());
            }
            if(!erreur){
                this.commentaireRepository.save(commentaire);
                res.setOk(true);
                res.setMessage("Commentaire modifié.");
                Set<Object> set = new HashSet<>();
                set.add(this.commentaireEntityToDto(commentaire));
                res.setData(set);
            }
        }catch (EntityNotFoundException e){
            res.setOk(false);
            res.setMessage("L'identifiant n'existe pas.");
        }
        return res;
    }

    @Override
    public ResultatDto deleteCommentaire(String objId) {
        ResultatDto res = new ResultatDto();
        try{
            ObjectId objectId = new ObjectId(objId);
            Commentaire c =  this.commentaireRepository.findById(objectId).orElseThrow(() -> new EntityNotFoundException("Commentaire not found"));
            this.commentaireRepository.delete(c);
            res.setOk(true);
            res.setMessage("Commentaire supprimé");
        }catch(EntityNotFoundException e){
            res.setOk(false);
            res.setMessage("Commentaire inexistante");
        }
        return res;
    }

    @Override
    public ResultatDto getAllCommentaires() {
        ResultatDto res = new ResultatDto();
        List<Commentaire> commentaireList = this.commentaireRepository.findAll();
        Set<Object> commentairesDto = new HashSet<>();
        commentaireList.forEach(commentaire -> {
            commentairesDto.add(commentaireEntityToDto(commentaire));
        });
        res.setOk(true);
        res.setMessage("Liste de toutes les commentaires.");
        res.setData(commentairesDto);
        return res;
    }

    @Override
    public ResultatDto getCommentaireByUtilisateur(String pseudo) {
        ResultatDto res = new ResultatDto();
        try {
            Utilisateur u = this.utilisateurRepository.findById(pseudo).orElseThrow(() -> new EntityNotFoundException("Utilisateur not found"));
            List<Commentaire> commentaireList = this.commentaireRepository.findAll();
            Set<Object> commentairesDto = new HashSet<>();
            commentaireList.forEach(commentaire -> {
                if(commentaire.getPseudoUtilisateur().equals(pseudo)) {
                    commentairesDto.add(commentaireEntityToDto(commentaire));
                }
            });
            res.setOk(true);
            res.setMessage("Liste de toutes les commentaires de l'utilisateur "+pseudo+".");
            res.setData(commentairesDto);
        }catch(EntityNotFoundException e){
            res.setOk(false);
            res.setMessage("Utilisateur inexistant.");
        }
        return res;
    }

    @Override
    public ResultatDto getCommentaireBySortie(int idSortie) {
        ResultatDto res = new ResultatDto();
        try {
            Sortie s = this.sortieRepository.findById(idSortie).orElseThrow(() -> new EntityNotFoundException("Sortie not found"));
            List<Commentaire> commentaireList = this.commentaireRepository.findAll();
            Set<Object> commentairesDto = new HashSet<>();
            commentaireList.forEach(commentaire -> {
                if(commentaire.getIdSortie()==idSortie) {
                    commentairesDto.add(commentaireEntityToDto(commentaire));
                }
            });
            res.setOk(true);
            res.setMessage("Liste de toutes les commentaires de la sortie "+idSortie+".");
            res.setData(commentairesDto);
        }catch(EntityNotFoundException e){
            res.setOk(false);
            res.setMessage("Sortie inexistant.");
        }
        return res;
    }

    private CommentaireDto commentaireEntityToDto(Commentaire commentaire) {
        CommentaireDto commentaireDto = new CommentaireDto();
        commentaireDto.set_id(commentaire.get_id().toHexString());
        commentaireDto.setCommentaire(commentaire.getCommentaire());
        commentaireDto.setIdSortie(commentaire.getIdSortie());
        commentaireDto.setPseudoUtilisateur(commentaire.getPseudoUtilisateur());
        commentaireDto.setNote(commentaire.getNote());
        commentaireDto.setImages(commentaire.getImages());
        commentaireDto.setDateHeureCreation(commentaire.getDateHeureCreation());
        return commentaireDto;
    }

    private Commentaire commentaireDtoToEntity(CommentaireDto commentaireDto) {
        Commentaire commentaire = new Commentaire();
        commentaire.set_id(new ObjectId(commentaireDto.get_id()));
        commentaire.setIdSortie(commentaireDto.getIdSortie());
        commentaire.setPseudoUtilisateur(commentaireDto.getPseudoUtilisateur());
        commentaire.setDateHeureCreation(commentaireDto.getDateHeureCreation());
        commentaire.setCommentaire(commentaireDto.getCommentaire());
        commentaire.setNote(commentaireDto.getNote());
        commentaire.setImages(commentaireDto.getImages());
        return commentaire;
    }
}
