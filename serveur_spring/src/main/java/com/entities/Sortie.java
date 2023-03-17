package com.entities;

import java.io.Serializable;
import java.sql.Time;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author Utilisateur
 */
@Entity
@Table(name = "Sortie")
@NamedQueries({
        @NamedQuery(name = "Sortie.findAll", query = "SELECT s FROM Sortie s"),
        @NamedQuery(name = "Sortie.findByIdSortie", query = "SELECT s FROM Sortie s WHERE s.idSortie = :idSortie"),
        @NamedQuery(name = "Sortie.findByNomSortie", query = "SELECT s FROM Sortie s WHERE s.nomSortie = :nomSortie"),
        @NamedQuery(name = "Sortie.findByDescriptionSortie", query = "SELECT s FROM Sortie s WHERE s.descriptionSortie = :descriptionSortie"),
        @NamedQuery(name = "Sortie.findByPrixSortie", query = "SELECT s FROM Sortie s WHERE s.prixSortie = :prixSortie"),
        @NamedQuery(name = "Sortie.findByNbPlaces", query = "SELECT s FROM Sortie s WHERE s.nbPlaces = :nbPlaces"),
        @NamedQuery(name = "Sortie.findByNbInscrits", query = "SELECT s FROM Sortie s WHERE s.nbInscrits = :nbInscrits"),
        @NamedQuery(name = "Sortie.findByDate", query = "SELECT s FROM Sortie s WHERE s.date = :date"),
        @NamedQuery(name = "Sortie.findByHeure", query = "SELECT s FROM Sortie s WHERE s.heure = :heure"),
        @NamedQuery(name = "Sortie.findByDuree", query = "SELECT s FROM Sortie s WHERE s.duree = :duree"),
        @NamedQuery(name = "Sortie.findByLieu", query = "SELECT s FROM Sortie s WHERE s.lieu = :lieu"),
        @NamedQuery(name = "Sortie.findByImage", query = "SELECT s FROM Sortie s WHERE s.image = :image"),
        @NamedQuery(name = "Sortie.findByNbVues", query = "SELECT s FROM Sortie s WHERE s.nbVues = :nbVues")})
public class Sortie implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "idSortie")
    private Integer idSortie;
    @Basic(optional = false)
    @Column(name = "nomSortie")
    private String nomSortie;
    @Basic(optional = false)
    @Column(name = "descriptionSortie")
    private String descriptionSortie;
    @Basic(optional = false)
    @Column(name = "prixSortie")
    private int prixSortie;
    @Basic(optional = false)
    @Column(name = "nbPlaces")
    private int nbPlaces;
    @Basic(optional = false)
    @Column(name = "nbInscrits")
    private int nbInscrits;
    @Basic(optional = false)
    @Column(name = "date")
    @Temporal(TemporalType.DATE)
    private Date date;
    @Basic(optional = false)
    @Column(name = "heure")
    private Time heure;
    @Basic(optional = false)
    @Column(name = "duree")
    private Time duree;
    @Basic(optional = false)
    @Column(name = "lieu")
    private String lieu;
    @Basic(optional = false)
    @Column(name = "image")
    private String image;
    @Basic(optional = false)
    @Column(name = "nbVues")
    private int nbVues;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "idSortie")
    private Set<Reservation> reservationSet;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "idSortie")
    private Set<Monoption> optionSet;

    public Sortie() {
    }

    public Sortie(Integer idSortie) {
        this.idSortie = idSortie;
    }

    public Sortie(Integer idSortie, String nomSortie, String descriptionSortie,int prixSortie, int nbPlaces, int nbInscrits, Date date, Time heure, Time duree, String lieu, int nbVues) {
        this.idSortie = idSortie;
        this.nomSortie = nomSortie;
        this.descriptionSortie= descriptionSortie;
        this.prixSortie = prixSortie;
        this.nbPlaces = nbPlaces;
        this.nbInscrits = nbInscrits;
        this.date = date;
        this.heure = heure;
        this.duree = duree;
        this.lieu = lieu;
        this.nbVues = nbVues;
        this.optionSet= new HashSet<>();
        this.reservationSet= new HashSet<>();
    }

    public Integer getIdSortie() {
        return idSortie;
    }

    public void setIdSortie(Integer idSortie) {
        this.idSortie = idSortie;
    }

    public String getNomSortie() {
        return nomSortie;
    }

    public void setNomSortie(String nomSortie) {
        this.nomSortie = nomSortie;
    }

    public String getDescriptionSortie() { return descriptionSortie; }

    public void setDescriptionSortie(String descriptionSortie) { this.descriptionSortie = descriptionSortie; }

    public int getPrixSortie() {
        return prixSortie;
    }

    public void setPrixSortie(int prixSortie) {
        this.prixSortie = prixSortie;
    }

    public int getNbPlaces() {
        return nbPlaces;
    }

    public void setNbPlaces(int nbPlaces) {
        this.nbPlaces = nbPlaces;
    }

    public int getNbInscrits() {
        return nbInscrits;
    }

    public void setNbInscrits(int nbInscrits) {
        this.nbInscrits = nbInscrits;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Time getHeure() {
        return heure;
    }

    public void setHeure(Time heure) {
        this.heure = heure;
    }

    public Time getDuree() {
        return duree;
    }

    public void setDuree(Time duree) {
        this.duree = duree;
    }

    public String getLieu() {
        return lieu;
    }

    public void setLieu(String lieu) {
        this.lieu = lieu;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public int getNbVues() {
        return nbVues;
    }

    public void setNbVues(int nbVues) {
        this.nbVues = nbVues;
    }

    public Set<Reservation> getReservationSet() {
        return reservationSet;
    }

    public void setReservationSet(Set<Reservation> reservationSet) {
        this.reservationSet = reservationSet;
    }

    public Set<Monoption> getOptionSet() {
        return optionSet;
    }

    public void setOptionSet(Set<Monoption> optionSet) {
        this.optionSet = optionSet;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idSortie != null ? idSortie.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Sortie)) {
            return false;
        }
        Sortie other = (Sortie) object;
        if ((this.idSortie == null && other.idSortie != null) || (this.idSortie != null && !this.idSortie.equals(other.idSortie))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Sortie[ idSortie=" + idSortie + " ]";
    }

}
