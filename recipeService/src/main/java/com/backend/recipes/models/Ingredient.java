
package com.backend.recipes.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

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

    @JsonIgnoreProperties({"ingredient"})
//    @JsonManagedReference
    @OneToMany(mappedBy = "ingredient", fetch = FetchType.LAZY)
    private List<RecipeIngredient> recipeIngredients;

    private String name;

    public Ingredient(String name) {
        this.name = name;
        this.recipeIngredients = new ArrayList<RecipeIngredient>();
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

    public List<RecipeIngredient> getRecipeIngredient() {
        return recipeIngredients;
    }

    public void setRecipeIngredient(List<RecipeIngredient> recipeIngredient) {
        this.recipeIngredients = recipeIngredient;
    }

    public void addRecipeIngredient(RecipeIngredient recipeIngredient){
        this.recipeIngredients.add(recipeIngredient);
    }
}
