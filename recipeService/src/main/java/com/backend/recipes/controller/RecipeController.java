package com.backend.recipes.controller;

import com.backend.recipes.models.Recipe;
import com.backend.recipes.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.OptionalLong;

@RestController
public class RecipeController {
    @Autowired
    RecipeRepository recipeRepo;

    @GetMapping(value = "/recipes")
    public ResponseEntity<List<Recipe>> getAllRecipes(@RequestParam Optional<String> categoryType,
                                                      @RequestParam Optional<String> name,
                                                      @RequestParam Optional<Long> id){
        if(categoryType.isPresent()){
            return new ResponseEntity<>(recipeRepo.findByCategoriesType(categoryType.get()), HttpStatus.OK);
        }

        if(name.isPresent()){
            return new ResponseEntity<>(recipeRepo.findByNameContainingIgnoreCase(name.get()), HttpStatus.OK);
        }
//        if(ingredient.isPresent()){
//            return new ResponseEntity<>(recipeRepo.findByRecipeIngredientsIngredient(ingredient.get()), HttpStatus.OK);
//        }
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
