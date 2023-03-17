package com.services;

import com.dtos.ResultatDto;
import com.dtos.CommentaireDto;
import org.bson.types.ObjectId;

public interface CommentaireService {

    /**
     * Sauvegarder un commentaire
     */
    ResultatDto saveCommentaire(CommentaireDto commentaireDto);

    /**
     * Récupérer un commentaire par son id
     */
    ResultatDto getCommentaireById(String objId);

    /**
     * Modifier un commentaire par son id
     */
    ResultatDto updateCommentaireById(String objId, CommentaireDto commentaireDto);

    /**
     * Supprimer un commentaire par son id
     */
    ResultatDto deleteCommentaire(String objId);

    /**
     * Récuperer tous les commentaires
     */
    ResultatDto getAllCommentaires();

    /**
     * Récupérer tous les commentaires d'un utilisateur par son pseudo
     */
    ResultatDto getCommentaireByUtilisateur(String pseudo);

    /**
     * Récupérer tous les commentaires d'une sortie par son id
     */
    ResultatDto getCommentaireBySortie(int idSortie);
}
