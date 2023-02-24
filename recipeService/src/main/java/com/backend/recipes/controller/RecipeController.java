package com.backend.recipes.controller;

import com.backend.recipes.models.Recipe;
import com.backend.recipes.models.Recipe_Ingredient;
import com.backend.recipes.repository.RecipeRepository;
import com.backend.recipes.repository.Recipe_IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
public class RecipeController {
    @Autowired
    RecipeRepository recipeRepo;

    @GetMapping(value = "/recipes")
    public ResponseEntity<List<Recipe>> getAllRecipes(){
        return new ResponseEntity<>(recipeRepo.findAll(), HttpStatus.OK);
    }
    @GetMapping(value = "/recipes/{id}")
    public ResponseEntity getRecipes(@PathVariable Long id){
        return new ResponseEntity<>(recipeRepo.findById(id), HttpStatus.OK);
    }

    @PostMapping(value = "/recipes")
    public ResponseEntity<Recipe> postRecipe(@RequestBody Recipe recipe){
        recipeRepo.save(recipe);
        return new ResponseEntity<>(recipe, HttpStatus.CREATED);
    }
}
