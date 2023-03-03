package com.backend.recipes.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
@Table(name = "recipeIngredients")
public class RecipeIngredient {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name = "recipeIngredient_id")
    private Long id;

    private double quantity;
    private String unit;

    @JsonIgnoreProperties({"recipeIngredients"})
//    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "recipe_id", nullable = false)
    private Recipe recipe;

    @JsonIgnoreProperties({"recipeIngredient"})
    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "ingredient_id", nullable = false)
    private Ingredient ingredient;

    public RecipeIngredient(double quantity, String unit, Recipe recipe, Ingredient ingredient) {
        this.quantity = quantity;
        this.unit = unit;
        this.recipe = recipe;
        this.ingredient = ingredient;
    }

    public RecipeIngredient(){}
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getQuantity() {
        return quantity;
    }

    public void setQuantity(double quantity) {
        quantity = quantity;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public Recipe getRecipe() {
        return recipe;
    }

    public void setRecipe(Recipe recipe) {
        this.recipe = recipe;
    }

    public Ingredient getIngredient() {
        return ingredient;
    }

    public void setIngredient(Ingredient ingredient) {
        this.ingredient = ingredient;
    }
}
