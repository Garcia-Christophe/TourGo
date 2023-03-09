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
@Table(name = "Reservation")
@NamedQueries({
        @NamedQuery(name = "Reservation.findAll", query = "SELECT r FROM Reservation r"),
        @NamedQuery(name = "Reservation.findByIdReservation", query = "SELECT r FROM Reservation r WHERE r.idReservation = :idReservation"),
        @NamedQuery(name = "Reservation.findByNbPersonnes", query = "SELECT r FROM Reservation r WHERE r.nbPersonnes = :nbPersonnes")})
public class Reservation implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "idReservation")
    private Integer idReservation;
    @Basic(optional = false)
    @Column(name = "nbPersonnes")
    private int nbPersonnes;
    @ManyToMany(mappedBy = "reservationSet")
    private Set<Option> optionSet;
    @JoinColumn(name = "idCommande", referencedColumnName = "idCommande")
    @ManyToOne(optional = false)
    private Commande idCommande;
    @JoinColumn(name = "idSortie", referencedColumnName = "idSortie")
    @ManyToOne(optional = false)
    private Sortie idSortie;

    public Reservation() {
    }

    public Reservation(Integer idReservation) {
        this.idReservation = idReservation;
    }

    public Reservation(Integer idReservation, int nbPersonnes) {
        this.idReservation = idReservation;
        this.nbPersonnes = nbPersonnes;
    }

    public Integer getIdReservation() {
        return idReservation;
    }

    public void setIdReservation(Integer idReservation) {
        this.idReservation = idReservation;
    }

    public int getNbPersonnes() {
        return nbPersonnes;
    }

    public void setNbPersonnes(int nbPersonnes) {
        this.nbPersonnes = nbPersonnes;
    }

    public Set<Option> getOptionSet() {
        return optionSet;
    }

    public void setOptionSet(Set<Option> optionSet) {
        this.optionSet = optionSet;
    }

    public Commande getIdCommande() {
        return idCommande;
    }

    public void setIdCommande(Commande idCommande) {
        this.idCommande = idCommande;
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
        hash += (idReservation != null ? idReservation.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Reservation)) {
            return false;
        }
        Reservation other = (Reservation) object;
        if ((this.idReservation == null && other.idReservation != null) || (this.idReservation != null && !this.idReservation.equals(other.idReservation))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Reservation[ idReservation=" + idReservation + " ]";
    }

}
