package com.entities;

import java.io.Serializable;
import java.util.Set;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

/**
 *
 * @author Utilisateur
 */
@Entity
@Table(name = "Monoption")
@NamedQueries({
        @NamedQuery(name = "Monoption.findAll", query = "SELECT o FROM Monoption o"),
        @NamedQuery(name = "Monoption.findByIdOption", query = "SELECT o FROM Monoption o WHERE o.idOption = :idOption"),
        @NamedQuery(name = "Monoption.findByNomOption", query = "SELECT o FROM Monoption o WHERE o.nomOption = :nomOption"),
        @NamedQuery(name = "Monoption.findByPrixOption", query = "SELECT o FROM Monoption o WHERE o.prixOption = :prixOption")})
public class Monoption implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "idOption")
    private Integer idOption;
    @Basic(optional = false)
    @Column(name = "nomOption")
    private String nomOption;
    @Basic(optional = false)
    @Column(name = "prixOption")
    private int prixOption;
    @JoinTable(name = "LiaisonReservationOption", joinColumns = {
            @JoinColumn(name = "idOption", referencedColumnName = "idOption")}, inverseJoinColumns = {
            @JoinColumn(name = "idReservation", referencedColumnName = "idReservation")})
    @ManyToMany
    private Set<Reservation> reservationSet;
    @JoinColumn(name = "idSortie", referencedColumnName = "idSortie")
    @ManyToOne(optional = false)
    private Sortie idSortie;

    public Monoption() {
    }

    public Monoption(Integer idOption) {
        this.idOption = idOption;
    }

    public Monoption(Integer idOption, String nomOption, int prixOption) {
        this.idOption = idOption;
        this.nomOption = nomOption;
        this.prixOption = prixOption;
    }

    public Integer getIdOption() {
        return idOption;
    }

    public void setIdOption(Integer idOption) {
        this.idOption = idOption;
    }

    public String getNomOption() {
        return nomOption;
    }

    public void setNomOption(String nomOption) {
        this.nomOption = nomOption;
    }

    public int getPrixOption() {
        return prixOption;
    }

    public void setPrixOption(int prixOption) {
        this.prixOption = prixOption;
    }

    public Set<Reservation> getReservationSet() {
        return reservationSet;
    }

    public void setReservationSet(Set<Reservation> reservationSet) {
        this.reservationSet = reservationSet;
    }

    public Sortie getIdSortie() {
        return idSortie;
    }

    public void setIdSortie(Sortie idSortie) {
        this.idSortie = idSortie;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idOption != null ? idOption.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Monoption)) {
            return false;
        }
        Monoption other = (Monoption) object;
        if ((this.idOption == null && other.idOption != null) || (this.idOption != null && !this.idOption.equals(other.idOption))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Monoption[ idOption=" + idOption + " ]";
    }

}
