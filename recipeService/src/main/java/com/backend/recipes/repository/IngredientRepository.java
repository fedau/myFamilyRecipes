package com.backend.recipes.repository;

import com.backend.recipes.models.Ingredient;
import com.backend.recipes.models.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.Optional;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Long> {


    List<Ingredient> findByIngredientNameContainingIgnoreCase(String name);

    List<Ingredient> findByRecipeIngredientsRecipe(Recipe recipe);

    Optional<Ingredient> findByIngredientNameIgnoreCase(String name);

}
