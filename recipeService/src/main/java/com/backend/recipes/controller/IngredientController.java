package com.backend.recipes.controller;

import com.backend.recipes.models.Category;
import com.backend.recipes.models.Ingredient;
import com.backend.recipes.repository.CategoryRepository;
import com.backend.recipes.repository.IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class IngredientController {


    @Autowired
    IngredientRepository ingredientRepo;

    @GetMapping(value = "/ingredients")
    public ResponseEntity<List<Ingredient>> getAllIngredients(){
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
