package com.dtos;

import com.entities.Reservation;
import com.entities.Sortie;
import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Data
public class OptionDto {
    private int idOption;
    private String nomOption;
    private int prixOption;
    private int idSortie;
}
