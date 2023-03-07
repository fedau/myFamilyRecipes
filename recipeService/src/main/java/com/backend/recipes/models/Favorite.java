package com.backend.recipes.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

public class Favorite {

    @JsonIgnoreProperties({"recipe"})
    @ManyToOne
    @JoinColumn(name = "recipe_id", nullable = false)
    private Recipe recipe;

    private String user_id;

    public Favorite(Recipe recipe) {
        this.recipe = recipe;
        this.user_id = user_id;
    }

    public Recipe getRecipe() {
        return recipe;
    }

    public void setRecipe(Recipe recipe) {
        this.recipe = recipe;
    }
}
