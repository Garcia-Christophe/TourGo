package com.entities;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;


@Data
@Document("commentaires")
public class Commentaire implements Serializable {
    @Id
    ObjectId _id;
    String pseudoUtilisateur;
    Integer idSortie;
    String dateHeureCreation;
    int note;
    String commentaire;
    Set<String> images;

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (_id != null ? _id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null || !(obj instanceof Commentaire))
            return false;
        if (obj == this)
            return true;
        Commentaire objC = (Commentaire) obj;
        return this._id.equals(objC._id);
    }

    @Override
    public String toString() {
        return "Commentaire[ _id=" + _id + " ]";
    }
}
