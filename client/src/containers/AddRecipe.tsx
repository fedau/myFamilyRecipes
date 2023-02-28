import React from 'react'
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { RecipeData, CategoriesData } from '../interfaces';
import Loading from '../components/Loading';

import { useState } from "react";

const defaultFormData = {
  recipeName: "",
  recipeDescription: "",
  recipeServings: 0,
  recipeCookingTime: 0,
  recipeImage:"",
  categories:[] as string[],
  recipeIngredientsUnit: "",
  recipeIngredientsQuantity:0,
  ingredientsName:"",

};


function AddRecipe({recipes, categoryList}: { recipes: RecipeData[]; categoryList: CategoriesData[] }) {
    const [formData, setFormData] = useState(defaultFormData);
    const { recipeName, recipeDescription, recipeCookingTime, recipeImage, ingredientsName, recipeIngredientsQuantity, recipeIngredientsUnit, recipeServings, categories }: { recipeName: string; recipeDescription: string; recipeCookingTime: number; recipeImage: string; ingredientsName: string; recipeIngredientsQuantity: number; recipeIngredientsUnit: string; recipeServings: number; categories: string[] } = formData;

  
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
    };
  
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(formData);
  
      setFormData(defaultFormData);
    };
  
    return (
      <>
        <h1>Form</h1>
        <p>Create a post</p>
  
        <form onSubmit={onSubmit}>
          <label htmlFor="recipeName">Title</label>
          <br />
          <input type="text" id="recipeName" value={recipeName} onChange={onChange} />
          <br />
          <br />
          <label htmlFor="recipeDescription">recipeDescription</label>
          <br />
          <input type="text" id="recipeDescription" value={recipeDescription} onChange={onChange} />
          <br />
          <br />
          <label htmlFor="recipeServings">recipeServings</label>
          <br />
          <input type="number" id="recipeServings" value={recipeServings} onChange={onChange} />
          <br />
          <br />
          <label htmlFor="recipeCookingTime">recipeCookingTime</label>
          <br />
          <input type="number" id="recipeCookingTime" value={recipeCookingTime} onChange={onChange} />
          <br />
          <br />
          <label htmlFor="ingredientsName">ingredientsName</label>
          <br />
          <input type="text" id="ingredientsName" value={ingredientsName} onChange={onChange} />
          <br />
          <br />
          <label htmlFor="recipeIngredientsUnit">recipeIngredientsUnit</label>
          <br />
          <input type="text" id="recipeIngredientsUnit" value={recipeIngredientsUnit} onChange={onChange} />
          <br />
          <br />
          <label htmlFor="recipeIngredientsQuantity">recipeIngredientsQuantity</label>
          <br />
          <input type="number" id="recipeIngredientsQuantity" value={recipeIngredientsQuantity} onChange={onChange} />
          <br />
          <br />
          {categoryList.map((category) => (
  <div key={category.id}>
    <input
      type="checkbox"
      id={category.type}
      value={category.type}
      checked={formData.categories.includes(category.type)} 
      onChange={(e) => {
        const checked = e.target.checked;
        const categoryType = category.type;
        setFormData((prevState) => {
          if (checked) {
            return { ...prevState, categories: [...prevState.categories, categoryType] };
          } else {
            return { ...prevState, categories: prevState.categories.filter((c) => c !== categoryType) };
          }
        });
      }}
      
    />
    <label htmlFor={category.type}>{category.type}</label>
  </div>
))}
          <br />
     
          <br />
          <br />
          <label htmlFor="recipeImage">recipeImage</label>
          <br />
          <input type="text" id="recipeImage" value={recipeImage} onChange={onChange} />
          <br />
          <br />
          <button type="submit">Upload post</button>
        </form>
      </>
    );
  }
  
  export default  withAuthenticationRequired(AddRecipe, {
      onRedirecting: () => <Loading />,
    });