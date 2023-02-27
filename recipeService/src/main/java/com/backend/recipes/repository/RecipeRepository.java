package com.backend.recipes.repository;

import com.backend.recipes.models.Category;
import com.backend.recipes.models.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {


    List<Recipe> findByCategoriesType(String categoryType);
    List<Recipe> findByNameContainingIgnoreCase(String name);

//    List<Recipe> findByRecipeIngredientsIngredient(String ingredient);


}
