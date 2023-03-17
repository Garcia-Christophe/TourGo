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
        //Vérification que la sortie est défini
        if (!erreur && commentaireDto.getIdSortie()== 0 ){
            res.setOk(false);
            res.setMessage("La sortie n'est pas définis.");
            erreur = true;
        }
        if (!erreur) {
            //Vérification de l'existance de la sortie
            try{
                Sortie s = this.sortieRepository.findById(commentaireDto.getIdSortie()).orElseThrow(() -> new EntityNotFoundException("Sortie not found"));
                //Vérification de l'existance de l'utilisateur
                try{
                    Utilisateur u = this.utilisateurRepository.findById(commentaireDto.getPseudoUtilisateur()).orElseThrow(() -> new EntityNotFoundException("Utilisateur not found"));
                    Commentaire c = this.commentaireDtoToEntity(commentaireDto);
                    //Enregistrement du commentaire
                    c = this.commentaireRepository.save(c);
                    //Ecriture de la réponse
                    commentaireDtoRetourne= this.commentaireEntityToDto(c);
                    res.setOk(true);
                    res.setMessage("Commentaire ajouté");
                    Set<Object> set = new HashSet<>();
                    set.add(commentaireDtoRetourne);
                    res.setData(set);
                }catch (EntityNotFoundException e){
                    //Ecriture de la réponse
                    res.setOk(false);
                    res.setMessage("L'utilisateur définis n'existe pas.");
                }
            }catch (EntityNotFoundException err){
                //Ecriture de la réponse
                res.setOk(false);
                res.setMessage("La soirée définis n'existe pas.");
            }
        }
        return res;
    }

    @Override
    public ResultatDto getCommentaireById(String objId) {
        ResultatDto res = new ResultatDto();
        //Vérification de l'existance du commentaire
        try {
            ObjectId objectId = new ObjectId(objId);
            //Récupération du commentaire
            Commentaire c = this.commentaireRepository.findById(objectId).orElseThrow(() -> new EntityNotFoundException("Commentaire not found"));
            //Ecriture de la réponse
            res.setOk(true);
            res.setMessage("Commentaire existant");
            Set<Object> set = new HashSet<>();
            set.add(this.commentaireEntityToDto(c));
            res.setData(set);
        }catch(EntityNotFoundException e){
            //Ecriture de la réponse
            res.setOk(false);
            res.setMessage("Commentaire inexistant");
        }
        return res;
    }

    @Override
    public ResultatDto updateCommentaireById(String objId, CommentaireDto commentaireDto) {
        ResultatDto res = new ResultatDto();
        //Vérification de l'existance du commentaire
        try {
            ObjectId objectId = new ObjectId(objId);
            Commentaire commentaire = commentaireRepository.findById(objectId).orElseThrow(() -> new EntityNotFoundException("Commentaire not found"));
            boolean erreur = false;
            //Vérification de la non modification de la sortie
            if(commentaireDto.getIdSortie()!=0 && commentaireDto.getIdSortie()!=commentaire.getIdSortie()){
                erreur=true;
                res.setOk(false);
                res.setMessage("Impossible de modifier la sortie");
            }
            //Vérification de la non modification de l'utilisateur
            if(!erreur && !commentaireDto.getPseudoUtilisateur().equals(commentaire.getPseudoUtilisateur())){
                erreur=true;
                res.setOk(false);
                res.setMessage("Impossible de modifier l'utilisateur");
            }
            //Modification des images si non null
            if(!erreur && commentaireDto.getImages()!=null){
                commentaire.getImages().removeAll(commentaire.getImages());
                commentaire.setImages(commentaireDto.getImages());
            }
            //Modification du commentaire si non null
            if(!erreur && commentaireDto.getCommentaire()!=null){
                commentaire.setCommentaire(commentaireDto.getCommentaire());
            }
            //Modification de la note si différentes de 0
            if(!erreur && commentaireDto.getNote()!=0){
                commentaire.setNote(commentaireDto.getNote());
            }
            if(!erreur){
                //Sauvegarde des modification du commentaire
                this.commentaireRepository.save(commentaire);
                //Ecriture de la réponse
                res.setOk(true);
                res.setMessage("Commentaire modifié.");
                Set<Object> set = new HashSet<>();
                set.add(this.commentaireEntityToDto(commentaire));
                res.setData(set);
            }
        }catch (EntityNotFoundException e){
            //Ecriture de la réponse
            res.setOk(false);
            res.setMessage("L'identifiant n'existe pas.");
        }
        return res;
    }

    @Override
    public ResultatDto deleteCommentaire(String objId) {
        ResultatDto res = new ResultatDto();
        //Vérification de l'existance du commentaire
        try{
            ObjectId objectId = new ObjectId(objId);
            Commentaire c =  this.commentaireRepository.findById(objectId).orElseThrow(() -> new EntityNotFoundException("Commentaire not found"));
            this.commentaireRepository.delete(c);
            //Ecriture de la réponse
            res.setOk(true);
            res.setMessage("Commentaire supprimé");
        }catch(EntityNotFoundException e){
            //Ecriture de la réponse
            res.setOk(false);
            res.setMessage("Commentaire inexistante");
        }
        return res;
    }

    @Override
    public ResultatDto getAllCommentaires() {
        ResultatDto res = new ResultatDto();
        //Récupération de tous les commentaires
        List<Commentaire> commentaireList = this.commentaireRepository.findAll();
        Set<Object> commentairesDto = new HashSet<>();
        commentaireList.forEach(commentaire -> {
            commentairesDto.add(commentaireEntityToDto(commentaire));
        });
        //Ecriture de la réponse
        res.setOk(true);
        res.setMessage("Liste de toutes les commentaires.");
        res.setData(commentairesDto);
        return res;
    }

    @Override
    public ResultatDto getCommentaireByUtilisateur(String pseudo) {
        ResultatDto res = new ResultatDto();
        //Vérification de l'existance de l'utilisateur
        try {
            Utilisateur u = this.utilisateurRepository.findById(pseudo).orElseThrow(() -> new EntityNotFoundException("Utilisateur not found"));
            //Récupération de tous les commentaire
            List<Commentaire> commentaireList = this.commentaireRepository.findAll();
            Set<Object> commentairesDto = new HashSet<>();
            commentaireList.forEach(commentaire -> {
                //récupération de tous les commentaires de l'utilisateur
                if(commentaire.getPseudoUtilisateur().equals(pseudo)) {
                    commentairesDto.add(commentaireEntityToDto(commentaire));
                }
            });
            //Ecriture de la réponse
            res.setOk(true);
            res.setMessage("Liste de toutes les commentaires de l'utilisateur "+pseudo+".");
            res.setData(commentairesDto);
        }catch(EntityNotFoundException e){
            //Ecriture de la réponse
            res.setOk(false);
            res.setMessage("Utilisateur inexistant.");
        }
        return res;
    }

    @Override
    public ResultatDto getCommentaireBySortie(int idSortie) {
        ResultatDto res = new ResultatDto();
        //Vérification de l'existance de la sortie
        try {
            Sortie s = this.sortieRepository.findById(idSortie).orElseThrow(() -> new EntityNotFoundException("Sortie not found"));
            //Récupération de tous les commentaires
            List<Commentaire> commentaireList = this.commentaireRepository.findAll();
            Set<Object> commentairesDto = new HashSet<>();
            commentaireList.forEach(commentaire -> {
                //Récupération de tous les commentaires de la sortie
                if(commentaire.getIdSortie()==idSortie) {
                    commentairesDto.add(commentaireEntityToDto(commentaire));
                }
            });
            //Ecriture de la réponse
            res.setOk(true);
            res.setMessage("Liste de toutes les commentaires de la sortie "+idSortie+".");
            res.setData(commentairesDto);
        }catch(EntityNotFoundException e){
            //Ecriture de la réponse
            res.setOk(false);
            res.setMessage("Sortie inexistant.");
        }
        return res;
    }

    private CommentaireDto commentaireEntityToDto(Commentaire commentaire) {
        CommentaireDto commentaireDto = new CommentaireDto();
        if(commentaire.get_id()!=null){
            commentaireDto.set_id(commentaire.get_id().toHexString());
        }
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
        if(commentaireDto.get_id()!=null && !commentaireDto.get_id().isEmpty()){
            commentaire.set_id(new ObjectId(commentaireDto.get_id()));
        }
        commentaire.setIdSortie(commentaireDto.getIdSortie());
        commentaire.setPseudoUtilisateur(commentaireDto.getPseudoUtilisateur());
        commentaire.setDateHeureCreation(commentaireDto.getDateHeureCreation());
        commentaire.setCommentaire(commentaireDto.getCommentaire());
        commentaire.setNote(commentaireDto.getNote());
        commentaire.setImages(commentaireDto.getImages());
        return commentaire;
    }
}
