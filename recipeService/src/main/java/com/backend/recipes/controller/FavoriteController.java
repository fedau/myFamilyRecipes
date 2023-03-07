package com.backend.recipes.controller;
import com.backend.recipes.models.Favorite;
import com.backend.recipes.repository.FavoriteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class FavoriteController {

    @Autowired
    FavoriteRepository favoRepo;

    @GetMapping(value = "/favorites")
    public ResponseEntity<List<Favorite>> getAllFavorites(){
        return new ResponseEntity<>(favoRepo.findAll(), HttpStatus.OK);
    }


    @GetMapping(value = "/favorites/{id}")
    public ResponseEntity getFavorites(@PathVariable Long id){
        return new ResponseEntity<>(favoRepo.findById(id), HttpStatus.OK);
    }

    @PostMapping(value = "/favorites")
    public ResponseEntity<Favorite> postFavorite(@RequestBody Favorite favorite){
        favoRepo.save(favorite);
        return new ResponseEntity<>(favorite, HttpStatus.CREATED);
    }
}
