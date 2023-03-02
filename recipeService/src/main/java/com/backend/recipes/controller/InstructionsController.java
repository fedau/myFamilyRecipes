package com.backend.recipes.controller;

import com.backend.recipes.models.Category;
import com.backend.recipes.models.Instructions;
import com.backend.recipes.repository.CategoryRepository;
import com.backend.recipes.repository.InstructionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class InstructionsController {

    @Autowired
    InstructionsRepository instructionsRepo;

    @GetMapping(value = "/instructions")
    public ResponseEntity<List<Instructions>> getAllInstructions(@RequestParam Optional<Long> recipeId){
        if(recipeId.isPresent()){
            return new ResponseEntity<>(instructionsRepo.findByRecipeId(recipeId.get()), HttpStatus.OK);
        }
        return new ResponseEntity<>(instructionsRepo.findAll(), HttpStatus.OK);
    }
    @GetMapping(value = "/instructions/{id}")
    public ResponseEntity getInstructions(@PathVariable Long id){
        return new ResponseEntity<>(instructionsRepo.findById(id), HttpStatus.OK);
    }

    @PostMapping(value = "/instructions")
    public ResponseEntity<Instructions> postCategory(@RequestBody Instructions instructions){
        instructionsRepo.save(instructions);
        return new ResponseEntity<>(instructions, HttpStatus.CREATED);
    }
}
