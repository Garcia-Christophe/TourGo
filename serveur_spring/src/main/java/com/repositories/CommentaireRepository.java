package com.repositories;

import com.entities.Commentaire;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface CommentaireRepository extends MongoRepository<Commentaire, ObjectId> {

}
