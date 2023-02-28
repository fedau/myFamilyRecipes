package com.backend.recipes.repository;

import com.backend.recipes.models.RecipeIngredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeIngredientRepository extends JpaRepository<RecipeIngredient, Long> {
//
    List<RecipeIngredient> findByRecipeId(Long id);
}
