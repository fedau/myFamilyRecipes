package com.backend.recipes.repository;

import com.backend.recipes.models.Ingredient;
import com.backend.recipes.models.Instructions;
import com.backend.recipes.models.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InstructionsRepository extends JpaRepository<Instructions, Long> {

    List<Instructions> findByRecipeId(Long id);
}
