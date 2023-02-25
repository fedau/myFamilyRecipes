package com.backend.recipes.components;

import com.backend.recipes.models.*;
import com.backend.recipes.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Profile("!test")
@Component
public class DataLoader implements ApplicationRunner {
    @Autowired
    CategoryRepository categroyRepo;

    @Autowired
    ImageRepository imageRepo;

    @Autowired
    InstructionsRepository instructionsRepo;

    @Autowired
    Recipe_IngredientRepository recipe_ingredientRepo;

    @Autowired
    IngredientRepository ingredientRepo;

    @Autowired
    RecipeRepository recipeRepo;

    public DataLoader(){

    }

    public  void run(ApplicationArguments args){
        Recipe waffles = new Recipe("Waffles a la oma", "Little Waffles made to keep for a while.", "1 hour", "90 small waffles");
        recipeRepo.save(waffles);

        Recipe flensjes = new Recipe("Pancakes a la oma", "These pancakes are also known as flensjes.", "30mins", "10 pancakes");
        recipeRepo.save(flensjes);

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

        Recipe_Ingredient waffleFlour = new Recipe_Ingredient(1, "kg", waffles, selfrisingFlour);
        recipe_ingredientRepo.save(waffleFlour);

        Recipe_Ingredient waffleSugar = new Recipe_Ingredient(600, "grams", waffles, sugar);
        recipe_ingredientRepo.save(waffleSugar);

        Recipe_Ingredient waffleEggs = new Recipe_Ingredient(6, "eggs", waffles, eggs);
        recipe_ingredientRepo.save(waffleEggs);

        Recipe_Ingredient waffleMilk = new Recipe_Ingredient(150, "ml", waffles, milk);
        recipe_ingredientRepo.save(waffleMilk);

        Recipe_Ingredient waffleButter = new Recipe_Ingredient(500, "grams", waffles, butter);
        recipe_ingredientRepo.save(waffleButter);

        Recipe_Ingredient waffleVanillaS = new Recipe_Ingredient(16, "grams", waffles, vanillaSugar);
        recipe_ingredientRepo.save(waffleVanillaS);

        Recipe_Ingredient waffleCustard = new Recipe_Ingredient(25, "grams", waffles, custardMix);
        recipe_ingredientRepo.save(waffleCustard);

        Recipe_Ingredient waffleCinnamon = new Recipe_Ingredient(1, "tablespoon", waffles, cinnamon);
        recipe_ingredientRepo.save(waffleCinnamon);



        Recipe_Ingredient pancakeFlour = new Recipe_Ingredient(250, "grams", flensjes, selfrisingFlour );
        recipe_ingredientRepo.save(pancakeFlour);
        Recipe_Ingredient pancakeSugar = new Recipe_Ingredient(70, "grams", flensjes, sugar);
        recipe_ingredientRepo.save(pancakeSugar);

        Recipe_Ingredient pancakeEggs = new Recipe_Ingredient(4, "eggs", flensjes, eggs);
        recipe_ingredientRepo.save(pancakeEggs);

        Recipe_Ingredient pancakeMilk = new Recipe_Ingredient(500, "ml", flensjes, milk);
        recipe_ingredientRepo.save(pancakeMilk);

        Recipe_Ingredient pancakeButter = new Recipe_Ingredient(20, "grams", flensjes, butter);
        recipe_ingredientRepo.save(pancakeButter);

        Recipe_Ingredient pancakeOil = new Recipe_Ingredient(20, "ml", flensjes, oil);
        recipe_ingredientRepo.save(pancakeOil);

        Instructions waffleInstr1 = new Instructions("Step 1", "Mix eggs, butter, sugar, vanilla sugar, cinnamon and milk. Unill combined well. ", waffles);
        instructionsRepo.save(waffleInstr1);
        Instructions waffleInstr2 = new Instructions("Step 2", "Add the self-rising flour and the custard powder", waffles);
        instructionsRepo.save(waffleInstr2);
        Instructions waffleInstr3 = new Instructions("Step 3", "Depending on the consistency sprea or roll the dough out on the table. Make small rolls if possible rouglhy 90 rolls. For small waffles. If dough is sticky use 2 spoons to transfer to the iron. ", waffles);
        instructionsRepo.save(waffleInstr3);

        Instructions waffleInstr4 = new Instructions("Step 4", "Bake waffles in hot iron until borders get brown. Keep the waffles in an iron box. ", waffles);
        instructionsRepo.save(waffleInstr4);

        Instructions pancake1 = new Instructions("step 1", "Add the flour and sugar together in a bowl. Make a well and add the eggs and beat them", flensjes);
        instructionsRepo.save(pancake1);

        Instructions pancake2 = new Instructions("step 2", "Whilst whisking slowly add the milk. Then the oil. Melt the butter and add to the mix. ", flensjes);
        instructionsRepo.save(pancake2);

        Instructions pancake3 = new Instructions("step 3", "Heat a pan and wait untill hot. Add some oil and let this get warm. Now add some batter and start frying the pancakes.", flensjes);
        instructionsRepo.save(pancake3);

        Category dessert = new Category("dessert");
        categroyRepo.save(dessert);

        Category family = new Category("family");
        categroyRepo.save(family);

        Category quick = new Category("quick qnd easy");
        categroyRepo.save(quick);

        waffles.addCategory(dessert);
        waffles.addCategory(family);
        dessert.addRecipe(waffles);
        recipeRepo.save(waffles);
//        categroyRepo.save(dessert);


        flensjes.addCategory(dessert);
        flensjes.addCategory(quick);
        flensjes.addCategory(family);
        recipeRepo.save(flensjes);


    }


}
