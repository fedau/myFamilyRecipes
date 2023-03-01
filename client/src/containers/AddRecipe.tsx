import React from 'react'
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { RecipeData, CategoriesData } from '../interfaces';
import Loading from '../components/Loading';
import { useState } from "react";

const defaultFormData = {
  name: "",
  description: "",
  servings: 0,
  cookingTime: 0,
  image:"",
  categories:[] as string[],
  recipeIngredientsUnit: "",
  recipeIngredientsQuantity:0,
  ingredientsName:"",

};


function AddRecipe({recipes, categoryList, handleRecipeSubmit}: { recipes: RecipeData[]; categoryList: CategoriesData[]; handleRecipeSubmit: any }) {
    const [formData, setFormData] = useState(defaultFormData);
    const { name, description, cookingTime, image, ingredientsName, recipeIngredientsQuantity, recipeIngredientsUnit, servings, categories }: { name: string; description: string; cookingTime: number; image: string; ingredientsName: string; recipeIngredientsQuantity: number; recipeIngredientsUnit: string; servings: number; categories: string[] } = formData;

  // on change for when typing in fields
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
    };
  // on submit calls handlReciepSubmit in recipeContainer
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(formData);
      handleRecipeSubmit(formData)
      setFormData(defaultFormData);
    };
  
    return (
      <>
        <h1>Form</h1>
        <p>Create a post</p>
  
        <form onSubmit={onSubmit}>
          <label htmlFor="name">Title</label>
          <br />
          <input type="text" id="name" value={name} onChange={onChange} />
          <br />
          <br />
          <label htmlFor="description">description</label>
          <br />
          <input type="text" id="description" value={description} onChange={onChange} />
          <br />
          <br />
          <label htmlFor="servings">servings</label>
          <br />
          <input type="number" id="servings" value={servings} onChange={onChange} />
          <br />
          <br />
          <label htmlFor="cookingTime">cookingTime</label>
          <br />
          <input type="number" id="cookingTime" value={cookingTime} onChange={onChange} />
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

          {/* mapping through all the existing types currently in the database */}
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
          <label htmlFor="image">image</label>
          <br />
          <input type="text" id="image" value={image} onChange={onChange} />
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