package com.dtos;

import com.entities.Commande;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Data
public class UtilisateurDto {
    private String pseudo;
    private String mdp;
    private String nom;
    private String prenom;
    private Date dateNaissance;
    private String mail;
}
