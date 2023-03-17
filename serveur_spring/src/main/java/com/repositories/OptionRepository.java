package com.repositories;

import com.entities.Monoption;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OptionRepository extends JpaRepository<Monoption, Integer> {
}

