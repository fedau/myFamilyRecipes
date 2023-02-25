package com.backend.recipes.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "ingredients")
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ingredient_id")
    private Long id;

    @JsonIgnoreProperties({"recipeIngredient_ingredient"})
    @OneToMany(mappedBy = "ingredient", fetch = FetchType.LAZY)
    private List<Recipe_Ingredient> recipeIngredient;


    private String name;

    public Ingredient(String name) {
        this.name = name;
        this.recipeIngredient = new ArrayList<Recipe_Ingredient>();
    }

    public Ingredient(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Recipe_Ingredient> getRecipeIngredient() {
        return recipeIngredient;
    }

    public void setRecipeIngredient(List<Recipe_Ingredient> recipeIngredient) {
        this.recipeIngredient = recipeIngredient;
    }

    public void addRecipeIngredient(Recipe_Ingredient recipeIngredient){
        this.recipeIngredient.add(recipeIngredient);
    }
}
