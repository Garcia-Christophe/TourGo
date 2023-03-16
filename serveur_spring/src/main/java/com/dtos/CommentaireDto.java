package com.dtos;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;


@Data
public class CommentaireDto{

    ObjectId _id;
    String pseudoUtilisateur;
    int idSortie;
    int note;
    String commentaire;
    String dateHeureCreation;
    Set<String> images;
}