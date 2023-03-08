
import '../css/RecipeDetail.css'
import React from 'react';
import {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { RecipeIngredientQuantity,  RecipeData } from '../interfaces';

const RecipeDetail = ({ recipe, handleDelete }: { recipe: RecipeData, handleDelete: any}) => {
  const navigate = useNavigate()
  const id = useParams();
  
  
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
    <div className='bodyRecipe'>
  <div className='desktop'>
    <div className='image'>
      <img src={recipe.image} alt="error no pic" />
    </div>
    <div className='title-description'>
      <h1 className='header'>{recipe.name}</h1>
      <div className='description'>
        <h4>{recipe.description} </h4>
        <p>
        cooking time: {recipe.cookingTime} minutes
        <br/>

      {recipe.servings} servings
        </p>
        <br/>
        Categories 
        {recipe.categories.map((category) => (
          <div key={category.id}>
            {category.type}
          </div>
        ))}
      </div>
    </div>
  </div>
  <div className='desktop'>
    <div className={"ingredients"}>
      <h3>Ingredients</h3>
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
    <div className='instruction'>
      <h3>Instructions</h3>
      {recipe.instructions.map((instruction) => (
  <ul key={instruction.id}>
    <li>
     <h4> Step Number {instruction.stepNumber} </h4>

          {instruction.stepDescription}
    </li>
  </ul>

         

))}
</div>
  </div>
  <div className='desktop'>
    <button  className='Magnet' onClick={onEdit}> Edit this recipe</button>
    <button  className='Magnet'  onClick={onDelete}>Delete this recipe </button>
  </div>
</div>
    </>

  );
};

export default RecipeDetail;

