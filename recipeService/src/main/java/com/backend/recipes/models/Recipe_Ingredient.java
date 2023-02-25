package com.backend.recipes.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;

@Entity
@Table(name = "recipeIngredients")
public class Recipe_Ingredient {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name = "recipe_ingredient_id")
    private Long id;

    private double Quantity;
    private String unit;

    @JsonIgnoreProperties({"recipe_recipeIngredients"})
    @ManyToOne
    @JoinColumn(name = "recipe_id", nullable = false)
    private Recipe recipe;

    @JsonIgnoreProperties({"recipeIngredient_ingredient"})
    @ManyToOne
    @JoinColumn(name = "ingredient_id", nullable = false)
    private Ingredient ingredient;

    public Recipe_Ingredient(double quantity, String unit, Recipe recipe, Ingredient ingredient) {
        Quantity = quantity;
        this.unit = unit;
        this.recipe = recipe;
        this.ingredient = ingredient;
    }

    public Recipe_Ingredient(){}
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getQuantity() {
        return Quantity;
    }

    public void setQuantity(double quantity) {
        Quantity = quantity;
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
