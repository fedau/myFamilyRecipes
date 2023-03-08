package com.backend.recipes.components;

import com.backend.recipes.models.*;
import com.backend.recipes.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
//
//@Profile("!test")
//@Component
public class DataLoader implements ApplicationRunner {
    @Autowired
    CategoryRepository categoryRepo;

    @Autowired
    ImageRepository imageRepo;

    @Autowired
    InstructionsRepository instructionsRepo;

    @Autowired
    RecipeIngredientRepository recipe_ingredientRepo;

    @Autowired
    IngredientRepository ingredientRepo;

    @Autowired
    RecipeRepository recipeRepo;

    public DataLoader(){

    }

    public  void run(ApplicationArguments args){
        Recipe waffles = new Recipe("Waffles a la oma", "Little Waffles made to keep for a while. Just like Oma Paula would make", 60, 50);
        recipeRepo.save(waffles);

        Recipe flensjes = new Recipe("Pancakes a la oma", "These pancakes are also known as flensjes. Just like Oma Paula would make", 30, 10);
        recipeRepo.save(flensjes);

        Recipe ramen = new Recipe("Ramen", "Warm brothy vibes. Perfect for a cold night.", 15, 2);
        recipeRepo.save(ramen);

        Recipe cereal = new Recipe("Cereal", "Sweet crunch. You know How it is", 5, 1);
        recipeRepo.save(cereal);

        Recipe grapees = new Recipe("Grapes", "Nothing but grapes", 1, 1);
        recipeRepo.save(grapees);

        Ingredient cocopuffs = new Ingredient("CocoPuffs");
        ingredientRepo.save(cocopuffs);
        Ingredient broth = new Ingredient("Broth");
        ingredientRepo.save(broth);

        Ingredient noodles = new Ingredient("Noodles");
        ingredientRepo.save(noodles);
        Ingredient grapes = new Ingredient("Grapes");
        ingredientRepo.save(grapes);

        Ingredient flour = new Ingredient("Flour");
        ingredientRepo.save(flour);

        Ingredient selfrisingFlour = new Ingredient("Self-rising Flour");
        ingredientRepo.save(selfrisingFlour);

        Ingredient sugar = new Ingredient("Sugar");
        ingredientRepo.save(sugar);

        Ingredient eggs = new Ingredient("eggs");
        ingredientRepo.save(eggs);

        Ingredient milk = new Ingredient("Milk");
        ingredientRepo.save(milk);

        Ingredient butter = new Ingredient("Butter");
        ingredientRepo.save(butter);

        Ingredient vanillaSugar = new Ingredient("Vanilla Sugar");
        ingredientRepo.save(vanillaSugar);

        Ingredient cinnamon = new Ingredient("Cinnamon");
        ingredientRepo.save(cinnamon);

        Ingredient custardMix = new Ingredient("Custard mix");
        ingredientRepo.save(custardMix);

        Ingredient salt = new Ingredient("salt");
        ingredientRepo.save(salt);

        Ingredient oil = new Ingredient("oil");
        ingredientRepo.save(oil);

        RecipeIngredient grapess = new RecipeIngredient(1, "grape", grapees, grapes);
        recipe_ingredientRepo.save(grapess);

        RecipeIngredient ramennood = new RecipeIngredient(100, "grams", ramen, noodles);
        recipe_ingredientRepo.save(ramennood);

        RecipeIngredient ramebroth = new RecipeIngredient(200, "ml", ramen, broth);
        recipe_ingredientRepo.save(ramebroth);

        RecipeIngredient cerealstuff = new RecipeIngredient(100, "grams", cereal, cocopuffs);
        recipe_ingredientRepo.save(cerealstuff);



        RecipeIngredient waffleFlour = new RecipeIngredient(1, "kg", waffles, selfrisingFlour);
        recipe_ingredientRepo.save(waffleFlour);

        RecipeIngredient waffleSugar = new RecipeIngredient(600, "grams", waffles, sugar);
        recipe_ingredientRepo.save(waffleSugar);

        RecipeIngredient waffleEggs = new RecipeIngredient(6, "eggs", waffles, eggs);
        recipe_ingredientRepo.save(waffleEggs);

        RecipeIngredient waffleMilk = new RecipeIngredient(150, "ml", waffles, milk);
        recipe_ingredientRepo.save(waffleMilk);

        RecipeIngredient waffleButter = new RecipeIngredient(500, "grams", waffles, butter);
        recipe_ingredientRepo.save(waffleButter);

        RecipeIngredient waffleVanillaS = new RecipeIngredient(16, "grams", waffles, vanillaSugar);
        recipe_ingredientRepo.save(waffleVanillaS);

        RecipeIngredient waffleCustard = new RecipeIngredient(25, "grams", waffles, custardMix);
        recipe_ingredientRepo.save(waffleCustard);

        RecipeIngredient waffleCinnamon = new RecipeIngredient(1, "tablespoon", waffles, cinnamon);
        recipe_ingredientRepo.save(waffleCinnamon);



        RecipeIngredient pancakeFlour = new RecipeIngredient(250, "grams", flensjes, selfrisingFlour );
        recipe_ingredientRepo.save(pancakeFlour);
        RecipeIngredient pancakeSugar = new RecipeIngredient(70, "grams", flensjes, sugar);
        recipe_ingredientRepo.save(pancakeSugar);

        RecipeIngredient pancakeEggs = new RecipeIngredient(4, "eggs", flensjes, eggs);
        recipe_ingredientRepo.save(pancakeEggs);

        RecipeIngredient pancakeMilk = new RecipeIngredient(500, "ml", flensjes, milk);
        recipe_ingredientRepo.save(pancakeMilk);

        RecipeIngredient pancakeButter = new RecipeIngredient(20, "grams", flensjes, butter);
        recipe_ingredientRepo.save(pancakeButter);

        RecipeIngredient pancakeOil = new RecipeIngredient(20, "ml", flensjes, oil);
        recipe_ingredientRepo.save(pancakeOil);

        Instructions waffleInstr1 = new Instructions(1, "Mix eggs, butter, sugar, vanilla sugar, cinnamon and milk. Unill combined well. ", waffles);
        instructionsRepo.save(waffleInstr1);
        Instructions waffleInstr2 = new Instructions(2, "Add the self-rising flour and the custard powder", waffles);
        instructionsRepo.save(waffleInstr2);
        Instructions waffleInstr3 = new Instructions(3, "Depending on the consistency sprea or roll the dough out on the table. Make small rolls if possible rouglhy 90 rolls. For small waffles. If dough is sticky use 2 spoons to transfer to the iron. ", waffles);
        instructionsRepo.save(waffleInstr3);

        Instructions waffleInstr4 = new Instructions(4, "Bake waffles in hot iron until borders get brown. Keep the waffles in an iron box. ", waffles);
        instructionsRepo.save(waffleInstr4);

        Instructions pancake1 = new Instructions(1, "Add the flour and sugar together in a bowl. Make a well and add the eggs and beat them", flensjes);
        instructionsRepo.save(pancake1);

        Instructions pancake2 = new Instructions(2, "Whilst whisking slowly add the milk. Then the oil. Melt the butter and add to the mix. ", flensjes);
        instructionsRepo.save(pancake2);

        Instructions pancake3 = new Instructions(3, "Heat a pan and wait untill hot. Add some oil and let this get warm. Now add some batter and start frying the pancakes.", flensjes);
        instructionsRepo.save(pancake3);


        Instructions grapeinstruc = new Instructions(1, "get a grape", grapees);
        instructionsRepo.save(grapeinstruc);


        Instructions ceraealinst = new Instructions(1, "make your cereeal", cereal);
        instructionsRepo.save(ceraealinst);


        Instructions rameninst1 = new Instructions(1, "boil the noodles in the broth", ramen);
        instructionsRepo.save(rameninst1);

        Instructions rameninst2 = new Instructions(2, "eat it", ramen);
        instructionsRepo.save(rameninst2);


        Category dessert = new Category("dessert");
        categoryRepo.save(dessert);

        Category family = new Category("family");
        categoryRepo.save(family);

        Category quick = new Category("quick");
        categoryRepo.save(quick);

        Category breakfast = new Category("breakfast");
        categoryRepo.save(breakfast);

        Category healthy = new Category("healthy");
        categoryRepo.save(healthy);

        Category vegetarian = new Category("vegetarian");
        categoryRepo.save(vegetarian);
        Category reinert = new Category("Reinert Family");
        categoryRepo.save(reinert);
        Category depraetere = new Category("Depraetere Family");
        categoryRepo.save(depraetere);

//        Image forWaffle = new Image("https://images.pexels.com/photos/4109465/pexels-photo-4109465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", waffles);
//        imageRepo.save(forWaffle);

        grapees.addCategory(healthy);
        grapees.addCategory(quick);
        recipeRepo.save(grapees);

ramen.addCategory(reinert);
        ramen.addCategory(vegetarian);
        ramen.addCategory(quick);
        recipeRepo.save(ramen);

        cereal.addCategory(breakfast);
        recipeRepo.save(cereal);
waffles.addCategory(depraetere);
        waffles.addCategory(dessert);
        waffles.addCategory(family);
        dessert.addRecipe(waffles);
        recipeRepo.save(waffles);
//        categroyRepo.save(dessert);


        flensjes.addCategory(depraetere);
        flensjes.addCategory(dessert);
        flensjes.addCategory(quick);
        flensjes.addCategory(family);
        recipeRepo.save(flensjes);


    }


}
