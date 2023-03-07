// import React from 'react'
// import { useNavigate } from 'react-router-dom'
// import Recipe from './Recipe';
// import { RecipeData } from '../interfaces';

import React from 'react';
import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { RecipeIngredientQuantity,  RecipeData } from '../interfaces';

const RecipeDetail = ({ recipe, handleDelete }: { recipe: RecipeData, handleDelete: any}) => {
  const navigate = useNavigate()

// state for recipeIngredient and fetch request to find ingredients linked to recipe Id
  const [recipeIngredients , setRecipeIngredientsRecipeId] = useState([] as RecipeIngredientQuantity[])
  const findRecipeById = () => {
    fetch(`/api/recipeIngredients?recipeId=${recipe.id}`)
      .then(response => response.json())
      .then((data) => {
        setRecipeIngredientsRecipeId(data)
    }
      )
      .catch(error => console.log(error));


  };

  useEffect(() => {
    findRecipeById();
  }, [])
  
  // when database is loading
  if(!recipe){
    return "waiting on the recipe"
}

const onDelete = () => {
  handleDelete(recipe.id)
}

const onEdit = () => {
  navigate(`/${recipe.id}/edit`)
}
// Recipe
  return (
    <>
      <img src={recipe.image} alt="error no pic" style={{ width: 500, height: 600 }} />
      <h1> {recipe.name}</h1>
      <br/> {recipe.description} 
      <br />
      cooking time: {recipe.cookingTime} minutes
       <br/> {recipe.servings} servings
       {recipe.categories.map((category) => (
        <div key={category.id}>
          {category.type}
          </div>
          ))}

       {recipe.instructions.map((instruction) => (
        <div key={instruction.id}>
          {instruction.stepNumber}
          <br/>
          {instruction.stepDescription}

          </div>
          ))}

   <div>
      {recipeIngredients.map((RecipeIngredientQuantity) =>(
        <ul key={RecipeIngredientQuantity.id}> 
        
          <li>
            {RecipeIngredientQuantity.quantity} 
          {RecipeIngredientQuantity.unit}
          {RecipeIngredientQuantity.ingredient.ingredientName} 
            </li>
        </ul>
      ))}
    </div> 
    <button onClick={onDelete}>Delete this recipe </button>
<button onClick={onEdit}> Edit this recipe</button>

    </>
  );
};

export default RecipeDetail;

