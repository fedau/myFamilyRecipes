// import React from 'react'
// import { useNavigate } from 'react-router-dom'
// import Recipe from './Recipe';
// import { RecipeData } from '../interfaces';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RecipeData } from '../interfaces';

const RecipeDetail = ({ recipe }: { recipe: RecipeData }) => {

  if(!recipe){
    return "still loading"
}
const url ="/recipes/" + recipe.id;

  return (
    <div>
      <img src={recipe.image} alt="error no picture" style={{ width: 500, height: 600 }} />
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
          {/* {recipe.recipeIngredients.map((recIngredient) =>(
            <div key={recIngredient.id}>
              {recIngredient.quantity}
              {recIngredient.unit}

            </div>
          ))} */}
    </div>
  );
};

export default RecipeDetail;

