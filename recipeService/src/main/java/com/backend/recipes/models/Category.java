package com.backend.recipes.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long id;

    private String type;

    @JsonIgnoreProperties({"categories"})
    @ManyToMany
    @Cascade(org.hibernate.annotations.CascadeType.SAVE_UPDATE)
    @JoinTable(
            name = "recipes_catgories",
            joinColumns = {@JoinColumn(name = "category_id", nullable = false)},
            inverseJoinColumns = {@JoinColumn(name = "recipe_id", nullable = false)}
    )
    private List<Recipe> recipe;

    public Category(String type) {
        this.type = type;
        this.recipe = new ArrayList<Recipe>();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<Recipe> getRecipe() {
        return recipe;
    }

    public void setRecipe(List<Recipe> recipe) {
        this.recipe = recipe;
    }

    public void addRecipe(Recipe recipe){
        this.recipe.add(recipe);
    }
}
