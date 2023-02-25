package com.backend.recipes.repository;

import com.backend.recipes.models.Category;
import com.backend.recipes.models.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    List<Recipe> findByCategories(Category category);
    List<Recipe> findByName(String name);

//    List<Recipe> findByRecipeIngredientsName(String name);


}
