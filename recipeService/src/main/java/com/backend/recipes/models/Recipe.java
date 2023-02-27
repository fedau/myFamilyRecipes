package com.backend.recipes.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "recipes")
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recipe_id")
    private Long id;

    private String name;

    private String description;

    private int cookingTime;

    private int servings;

    private String image;

    @JsonIgnoreProperties({"recipes"})
    @ManyToMany
    @Cascade(org.hibernate.annotations.CascadeType.SAVE_UPDATE)
    @JoinTable(
            name = "recipe_categories",
            joinColumns = {@JoinColumn(name = "recipe_id", nullable = false)},
            inverseJoinColumns = {@JoinColumn(name = "category_id", nullable = false)}
    )
    private List<Category> categories;
//    @JsonIgnoreProperties({"recipes"})
//    @JsonBackReference
    @JsonManagedReference
    @OneToMany(mappedBy = "recipe", fetch = FetchType.LAZY)
    private List<RecipeIngredient> recipeIngredients;


    @JsonIgnoreProperties({"recipe"})
//    @JsonBackReference
    @OneToMany(mappedBy = "recipe", fetch = FetchType.LAZY)
    private List<Instructions> instructions;

//    @JsonIgnoreProperties({"recipe"})
//    @OneToOne
//    @JoinColumn(name = "image_id", nullable = true)
//    private Image image;


    public Recipe(String name, String description, int cookingTime, int servings ){
        this.name = name;
        this.description = description;
        this.cookingTime = cookingTime;
        this.servings = servings;
        this.categories = new ArrayList<Category>();
        this.recipeIngredients = new ArrayList<RecipeIngredient>();
        this.instructions = new ArrayList<Instructions>();
        this.image = "https://images.pexels.com/photos/4109465/pexels-photo-4109465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
    }

    public Recipe(){}

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getCookingTime() {
        return cookingTime;
    }

    public void setCookingTime(int cookingTime) {
        this.cookingTime = cookingTime;
    }

    public int getServings() {
        return servings;
    }

    public void setServings(int servings) {
        this.servings = servings;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }

    public void addCategory(Category category){
        this.categories.add(category);
    }

    public List<RecipeIngredient> getRecipeIngredients() {
        return recipeIngredients;
    }

    public void setRecipeIngredients(List<RecipeIngredient> recipeIngredients) {
        this.recipeIngredients = recipeIngredients;
    }

    public void addRecipeIngredient(RecipeIngredient recipeIngredient){
        this.recipeIngredients.add(recipeIngredient);
    }

    public List<Instructions> getInstructions() {
        return instructions;
    }

    public void setInstructions(List<Instructions> instructions) {
        this.instructions = instructions;
    }

    public void addInstructions(Instructions instructions){
        this.instructions.add(instructions);
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
