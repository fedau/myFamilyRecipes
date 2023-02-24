package com.backend.recipes.repository;

import com.backend.recipes.models.Recipe_Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Recipe_IngredientRepository extends JpaRepository<Recipe_Ingredient, Long> {
}
