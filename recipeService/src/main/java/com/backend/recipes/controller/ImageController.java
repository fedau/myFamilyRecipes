package com.backend.recipes.controller;

import com.backend.recipes.models.Category;
import com.backend.recipes.models.Image;
import com.backend.recipes.repository.CategoryRepository;
import com.backend.recipes.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
public class ImageController {
    @Autowired
    ImageRepository imageRepo;


    @GetMapping(value = "/images")
    public ResponseEntity<List<Image>> getAllImages(){
        return new ResponseEntity<>(imageRepo.findAll(), HttpStatus.OK);
    }
    @GetMapping(value = "/images/{id}")
    public ResponseEntity getImage(@PathVariable Long id){
        return new ResponseEntity<>(imageRepo.findById(id), HttpStatus.OK);
    }

    @PostMapping(value = "/images")
    public ResponseEntity<Image> postImage(@RequestBody Image image){
        imageRepo.save(image);
        return new ResponseEntity<>(image, HttpStatus.CREATED);
    }
}
