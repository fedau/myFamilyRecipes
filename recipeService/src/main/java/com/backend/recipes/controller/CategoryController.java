package com.backend.recipes.controller;

import com.backend.recipes.models.Category;
import com.backend.recipes.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class CategoryController {
    @Autowired
    CategoryRepository categoryRepo;

    @GetMapping(value = "/categories")
    public ResponseEntity<List<Category>> getAllCategories(@RequestParam Optional<Long> recipeId){
        if(recipeId.isPresent()){
            return new ResponseEntity<>(categoryRepo.findByRecipeId(recipeId.get()), HttpStatus.OK);
        }
        return new ResponseEntity<>(categoryRepo.findAll(), HttpStatus.OK);
    }
    @GetMapping(value = "/categories/{id}")
    public ResponseEntity getCategory(@PathVariable Long id){
        return new ResponseEntity<>(categoryRepo.findById(id), HttpStatus.OK);
    }

    @PostMapping(value = "/categories")
    public ResponseEntity<Category> postCategory(@RequestBody Category category){
        categoryRepo.save(category);
        return new ResponseEntity<>(category, HttpStatus.CREATED);
    }
}
