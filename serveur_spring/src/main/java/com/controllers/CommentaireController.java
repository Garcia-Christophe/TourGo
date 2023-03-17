package com.controllers;

import com.dtos.CommandeDto;
import com.dtos.CommentaireDto;
import com.dtos.ResultatDto;
import com.services.impl.CommentaireServiceImpl;
import org.bson.types.ObjectId;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/commentaires")
public class CommentaireController {
    private final CommentaireServiceImpl commentaireService;

    public CommentaireController(CommentaireServiceImpl commentaireService) {
        this.commentaireService = commentaireService;
    }

    /**
     * Récupérer tous les commentaires
     */
    @GetMapping
    public ResultatDto getCommentaire() {
        return commentaireService.getAllCommentaires();
    }

    /**
     * Récupérer un commentaire correspondant à l'id
     */
    @GetMapping("/{_id}")
    public ResultatDto getCommentaire(@PathVariable String _id){
        return commentaireService.getCommentaireById(_id);
    }

    /**
     * Récupérer les commentaires d'un utilisateur correspondant à l'id
     */
    @GetMapping("/utilisateur/{pseudo}")
    public ResultatDto getCommentaireByUtilisateur(@PathVariable String pseudo){
        return commentaireService.getCommentaireByUtilisateur(pseudo);
    }

    /**
     * Récupérer les commentaires d'une sortie correspondant à l'id
     */
    @GetMapping("/sortie/{id}")
    public ResultatDto getCommentaireBySortie(@PathVariable int id){
        return commentaireService.getCommentaireBySortie(id);
    }

    /**
     * Enregistrer un nouveau commentaire
     */
    @PostMapping
    public ResultatDto saveCommentaire(final @RequestBody CommentaireDto commentaireDto){
        return commentaireService.saveCommentaire(commentaireDto);
    }

    /**
     * Modifier un commentaire existant
     */
    @PutMapping("/{_id}")
    public ResultatDto updateCommentaire(@PathVariable String _id,final @RequestBody CommentaireDto commentaireDto){
        return commentaireService.updateCommentaireById(_id,commentaireDto);
    }

    /**
     * Supprimer un commentaire existant
     */
    @DeleteMapping("/{_id}")
    public ResultatDto deleteCommentaire(@PathVariable String _id){
        return commentaireService.deleteCommentaire(_id);
    }


}
