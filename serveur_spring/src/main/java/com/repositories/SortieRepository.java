package com.repositories;

import com.entities.Sortie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SortieRepository extends JpaRepository<Sortie, Integer> {
}
