package com.backend.recipes.controller;

import com.backend.recipes.models.Ingredient;
import com.backend.recipes.models.Recipe;
import com.backend.recipes.models.RecipeIngredient;
import com.backend.recipes.repository.IngredientRepository;
import com.backend.recipes.repository.RecipeIngredientRepository;
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

    @Autowired
    IngredientRepository ingredientRepository;

    @Autowired
    RecipeIngredientRepository recipeIngredientRepository;

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
        return new ResponseEntity<>(recipeRepo.findAll(), HttpStatus.OK);
    }
    @GetMapping(value = "/recipes/{id}")
    public ResponseEntity getRecipes(@PathVariable Long id){
        return new ResponseEntity<>(recipeRepo.findById(id), HttpStatus.OK);
    }

//    @PostMapping(value = "/recipes")
//    public ResponseEntity<Recipe> postRecipe(@RequestBody Recipe recipe){
//// todo for each ingredient check if new? => save to make new ingredient
////  save new ingredient
////  get saved ingredient id
////  add ingredient id to  ingredient object? recipeingredient
//        recipeRepo.save(recipe);
//        return new ResponseEntity<>(recipe, HttpStatus.CREATED);
//    }

    @PostMapping(value = "/recipes")
    public Recipe createRecipe(@RequestBody Recipe recipe) {
        for (RecipeIngredient recipeIngredient : recipe.getRecipeIngredients()) {
            Optional<Ingredient> optionalIngredient = ingredientRepository.findByIngredientNameIgnoreCase(recipeIngredient.getIngredient().getIngredientName());
            if (optionalIngredient.isPresent()) {
                recipeIngredient.setIngredient(optionalIngredient.get());
            } else {
                Ingredient newIngredient = new Ingredient();
                newIngredient.setIngredientName(recipeIngredient.getIngredient().getIngredientName());
                ingredientRepository.save(newIngredient);
                recipeIngredient.setIngredient(newIngredient);
            }
        }
        recipe = recipeRepo.save(recipe);
        for (RecipeIngredient recipeIngredient : recipe.getRecipeIngredients()) {
            recipeIngredient.setRecipe(recipe);
            recipeIngredientRepository.save(recipeIngredient);
        }
        return recipe;
    }

    @PostMapping(value = "/recipes")
    public Recipe createRecipe(@RequestBody Recipe recipe) {
        for (RecipeIngredient recipeIngredient : recipe.getRecipeIngredients()) {
            Optional<Ingredient> optionalIngredient = ingredientRepository.findByIngredientNameIgnoreCase(recipeIngredient.getIngredient().getName());
            if (optionalIngredient.isPresent()) {
                recipeIngredient.setIngredient(optionalIngredient.get());
            } else {
                Ingredient newIngredient = new Ingredient();
                newIngredient.setIngredientName(recipeIngredient.getIngredient().getIngredientName());
                ingredientRepository.save(newIngredient);
                recipeIngredient.setIngredient(newIngredient);
            }
        }
        recipe = recipeRepo.save(recipe);
        for (RecipeIngredient recipeIngredient : recipe.getRecipeIngredients()) {
            recipeIngredient.setRecipe(recipe);
            recipeIngredientRepository.save(recipeIngredient);
        }
        return recipe;
    }

}
