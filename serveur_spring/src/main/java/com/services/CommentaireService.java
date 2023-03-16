package com.services;

import com.dtos.ResultatDto;
import com.dtos.CommentaireDto;
import org.bson.types.ObjectId;

public interface CommentaireService {

    /**
     * Sauvegarder une Commentaire
     */
    ResultatDto saveCommentaire(CommentaireDto commentaireDto);

    /**
     * Récupérer une Commentaire par son id
     */
    ResultatDto getCommentaireById(String objId);

    ResultatDto updateCommentaireById(String objId, CommentaireDto commentaireDto);

    /**
     * Supprimer une Commentaire par son identifiant
     */
    ResultatDto deleteCommentaire(String objId);

    /**
     * Récuperer toutes les Commentaires
     */
    ResultatDto getAllCommentaires();

    ResultatDto getCommentaireByUtilisateur(String pseudo);

    ResultatDto getCommentaireBySortie(int idSortie);
}
