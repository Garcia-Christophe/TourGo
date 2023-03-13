package com.dtos;

import com.entities.Utilisateur;
import lombok.Data;

import java.util.Date;
import java.util.Set;

@Data
public class CommandeDto {
    private int idCommande;
    private Date dateCommande;
    private String pseudoUtilisateur;
}
