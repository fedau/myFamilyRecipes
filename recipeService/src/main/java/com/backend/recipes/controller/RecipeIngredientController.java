package com.backend.recipes.controller;

import com.backend.recipes.models.RecipeIngredient;
import com.backend.recipes.repository.RecipeIngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RecipeIngredientController {

    @Autowired
    RecipeIngredientRepository recipe_ingredientRepo;

    @GetMapping(value = "/recipeIngredients")
    public ResponseEntity<List<RecipeIngredient>> getAllRecipeIngredients(){
        return new ResponseEntity<>(recipe_ingredientRepo.findAll(), HttpStatus.OK);
    }
    @GetMapping(value = "/recipeIngredients/{id}")
    public ResponseEntity getRecipeIngredients(@PathVariable Long id){
        return new ResponseEntity<>(recipe_ingredientRepo.findById(id), HttpStatus.OK);
    }

    @PostMapping(value = "/recipeIngredients")
    public ResponseEntity<RecipeIngredient> postRecipeIngredients(@RequestBody RecipeIngredient recipe_ingredient){
        recipe_ingredientRepo.save(recipe_ingredient);
        return new ResponseEntity<>(recipe_ingredient, HttpStatus.CREATED);
    }
}
