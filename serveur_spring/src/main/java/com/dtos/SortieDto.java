package com.dtos;

import lombok.Data;

import java.sql.Time;
import java.util.Date;

@Data
public class SortieDto {
    private int idSortie;
    private String nomSortie;
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
