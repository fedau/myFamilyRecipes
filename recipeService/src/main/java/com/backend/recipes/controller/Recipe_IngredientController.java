package com.backend.recipes.controller;

import com.backend.recipes.models.Category;
import com.backend.recipes.models.Recipe_Ingredient;
import com.backend.recipes.repository.CategoryRepository;
import com.backend.recipes.repository.Recipe_IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class Recipe_IngredientController {

    @Autowired
    Recipe_IngredientRepository recipe_ingredientRepo;

    @GetMapping(value = "/recipe_ingredients")
    public ResponseEntity<List<Recipe_Ingredient>> getAllRecipe_ingredients(){
        return new ResponseEntity<>(recipe_ingredientRepo.findAll(), HttpStatus.OK);
    }
    @GetMapping(value = "/recipe_ingredients/{id}")
    public ResponseEntity getRecipe_ingredients(@PathVariable Long id){
        return new ResponseEntity<>(recipe_ingredientRepo.findById(id), HttpStatus.OK);
    }

    @PostMapping(value = "/recipe_ingredients")
    public ResponseEntity<Recipe_Ingredient> postRecipe_ingredients(@RequestBody Recipe_Ingredient recipe_ingredient){
        recipe_ingredientRepo.save(recipe_ingredient);
        return new ResponseEntity<>(recipe_ingredient, HttpStatus.CREATED);
    }
}
