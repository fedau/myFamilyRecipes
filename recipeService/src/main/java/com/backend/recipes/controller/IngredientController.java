
package com.backend.recipes.controller;

import com.backend.recipes.models.Category;
import com.backend.recipes.models.Ingredient;
import com.backend.recipes.models.Recipe;
import com.backend.recipes.repository.CategoryRepository;
import com.backend.recipes.repository.IngredientRepository;
import com.backend.recipes.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class IngredientController {


    @Autowired
    IngredientRepository ingredientRepo;

    @Autowired
    RecipeRepository recipeRepo;

    @GetMapping(value = "/ingredients")
    public ResponseEntity<List<Ingredient>> getAllIngredients(@RequestParam Optional<String> name, @RequestParam Optional<Long> recipeId){
        if(name.isPresent()){
            return new ResponseEntity<>(ingredientRepo.findByIngredientNameContainingIgnoreCase(name.get()), HttpStatus.OK);
        }
//        if(recipe.isPresent()){
//            return new ResponseEntity<>(ingredientRepo.findByRecipeIngredientsRecipe(recipe.get()), HttpStatus.OK);
//        }
        if(recipeId.isPresent()){
            Optional<Recipe> recipe = recipeRepo.findById(recipeId.get());
            if(recipe.isPresent()){
                return new ResponseEntity<>(ingredientRepo.findByRecipeIngredientsRecipe(recipe.get()), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
        return new ResponseEntity<>(ingredientRepo.findAll(), HttpStatus.OK);
    }
    @GetMapping(value = "/ingredients/{id}")
    public ResponseEntity getIngredient(@PathVariable Long id){
        return new ResponseEntity<>(ingredientRepo.findById(id), HttpStatus.OK);
    }

    @PostMapping(value = "/ingredients")
    public ResponseEntity<Ingredient> postCategory(@RequestBody Ingredient ingredient){
        ingredientRepo.save(ingredient);
        return new ResponseEntity<>(ingredient, HttpStatus.CREATED);
    }
}
