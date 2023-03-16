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
     * <p>Get all Commentaire in the system</p>
     * @return List<CommentaireDto>
     */
    @GetMapping
    public ResultatDto getCommentaire() {
        return commentaireService.getAllCommentaires();
    }

    /**
     * Method to get the Commentaire based on the ID
     */
    @GetMapping("/{_id}")
    public ResultatDto getCommentaire(@PathVariable String _id){
        return commentaireService.getCommentaireById(_id);
    }

    /**
     * Get a commentaire by it's user id
     */
    @GetMapping("/utilisateur/{pseudo}")
    public ResultatDto getCommentaireByUtilisateur(@PathVariable String pseudo){
        return commentaireService.getCommentaireByUtilisateur(pseudo);
    }

    /**
     * Get a commentaire by it's sortie id
     */
    @GetMapping("/sortie/{id}")
    public ResultatDto getCommentaireBySortie(@PathVariable int id){
        return commentaireService.getCommentaireBySortie(id);
    }

    /**
     * Create a new commentaire in the system
     */
    @PostMapping
    public ResultatDto saveCommentaire(final @RequestBody CommentaireDto commentaireDto){
        return commentaireService.saveCommentaire(commentaireDto);
    }

    /**
     * Update a commentaire in the system
     */
    @PutMapping("/{_id}")
    public ResultatDto updateCommentaire(@PathVariable String _id,final @RequestBody CommentaireDto commentaireDto){
        return commentaireService.updateCommentaireById(_id,commentaireDto);
    }

    /**
     * Delete a commentaire in the system
     */
    @DeleteMapping("/{_id}")
    public ResultatDto deleteCommentaire(@PathVariable String _id){
        return commentaireService.deleteCommentaire(_id);
    }


}
