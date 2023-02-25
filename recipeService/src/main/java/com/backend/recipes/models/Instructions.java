package com.backend.recipes.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
@Table(name = "instructions")
public class Instructions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "instruction_id")
    private Long id;

    private String stepNumber;

    private String Description;

    @JsonIgnoreProperties({"instructions"})
    @ManyToOne
    @JoinColumn(name = "recipe_id", nullable = false)
    private Recipe recipe;

    public Instructions(String stepNumber, String description, Recipe recipe) {
        this.stepNumber = stepNumber;
        Description = description;
        this.recipe = recipe;
    }

    public Instructions(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStepNumber() {
        return stepNumber;
    }

    public void setStepNumber(String stepNumber) {
        this.stepNumber = stepNumber;
    }

    public String getDescription() {
        return Description;
    }

    public void setDescription(String description) {
        Description = description;
    }

    public Recipe getRecipe() {
        return recipe;
    }

    public void setRecipe(Recipe recipe) {
        this.recipe = recipe;
    }
}
