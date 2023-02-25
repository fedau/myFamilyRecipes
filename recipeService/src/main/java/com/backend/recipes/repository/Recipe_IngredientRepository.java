package com.backend.recipes.repository;

import com.backend.recipes.models.Recipe_Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Recipe_IngredientRepository extends JpaRepository<Recipe_Ingredient, Long> {

    List<Recipe_Ingredient> findByRecipeId(Long id);
}
