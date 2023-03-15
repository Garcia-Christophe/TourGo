package com.dtos;

import com.entities.Option;
import com.entities.Reservation;
import lombok.Data;

import javax.persistence.*;
import java.sql.Time;
import java.util.Date;
import java.util.Set;

@Data
public class SortieDto {
    private int idSortie;
    private String nomSortie;
    private String descriptionSortie;
    private int prixSortie;
    private int nbPlaces;
    private int nbInscrits;
    private Date date;
    private Time heure;
    private Time duree;
    private String lieu;
    private String image;
    private int nbVues;
}
