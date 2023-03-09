package com.dtos;

import com.entities.Commande;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Data
public class UtilisateurDto {
    private String pseudo;
    @Basic(optional = false)
    @Column(name = "mdp")
    private String mdp;
    @Basic(optional = false)
    @Column(name = "nom")
    private String nom;
    @Basic(optional = false)
    @Column(name = "prenom")
    private String prenom;
    private Date dateNaissance;
    private String mail;
    private Set<Integer> commandeIdSet;
}
