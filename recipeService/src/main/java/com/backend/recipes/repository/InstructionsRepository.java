package com.backend.recipes.repository;

import com.backend.recipes.models.Instructions;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InstructionsRepository extends JpaRepository<Instructions, Long> {
}
