package com.backend.recipes.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
@Table(name = "images")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private Long id;
    private String image;

//    @JsonIgnoreProperties({"image"})
//    @OneToOne
//    @JoinColumn(name = "recipe_id", nullable = true)
//    private Recipe recipe;

    public Image(String image, Recipe recipe) {
        this.image = image;
//        this.recipe = recipe;
    }

    public Image(){}
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

//    public Recipe getRecipe() {
//        return recipe;
//    }
//
//    public void setRecipe(Recipe recipe) {
//        this.recipe = recipe;
//    }
}
