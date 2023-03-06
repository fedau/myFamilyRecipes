package com.backend.recipes.repository;

import com.backend.recipes.models.Ingredient;
import com.backend.recipes.models.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {


    List<Recipe> findByCategoriesType(String categoryType);
    List<Recipe> findByNameContainingIgnoreCase(String name);
    Optional<Recipe> findById(Long id);


//    List<Recipe> findByRecipeIngredientsIngredient(String ingredient);


}
