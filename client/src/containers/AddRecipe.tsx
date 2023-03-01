import React from 'react'
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { RecipeData, CategoriesData, RecipeIngredient } from '../interfaces';
import Loading from '../components/Loading';
import { useState } from "react";

const defaultFormData = {
  name: "",
  description: "",
  servings: 0,
  cookingTime: 0,
  image:"",
  categories:[] as string[],
  unit: "",
  quantity:0,
  ingredientsName:"",


};

const instructionsFormData = {

  stepNumber: 0,
  stepDescription: "",

};

function AddRecipe({recipes, categoryList, handleRecipeSubmit, instructions, ingredients,}: { recipes: RecipeData[]; categoryList: CategoriesData[]; handleRecipeSubmit: any ; instructions: RecipeData[], ingredients: RecipeIngredient}) {
    const [formData, setFormData] = useState(defaultFormData);
    const [instructionData, setInstructionData] =useState(instructionsFormData)
    const { name, description, cookingTime, image, ingredientsName, quantity, unit, servings, categories }: { name: string; description: string; cookingTime: number; image: string; ingredientsName: string; quantity: number; unit: string; servings: number; categories: string[] } = formData;
    const {  stepNumber, stepDescription }: { stepNumber: number; stepDescription: string } = instructionData;


  // on change for when recipe in fields
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
    };
      // on change for when typing in fields
      const onChangeInstructions = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInstructionData((prevState) => ({
          ...prevState,
          [e.target.id]: e.target.value,
        }));
      };
  // on submit calls handlReciepSubmit in recipeContainer
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const categoriesForSubmit = formData.categories.map(category => {
        const foundCategory = categoryList.find(c => c.type === category);
        return foundCategory;
      })

      const formDataForSubmit = {
        ...formData,
        categories: categoriesForSubmit
      }

      handleRecipeSubmit(formDataForSubmit, instructionData)
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
          <label htmlFor="unit">unit</label>
          <br />
          <input type="text" id="unit" value={unit} onChange={onChange} />
          <br />
          <label htmlFor="quantity">quantity</label>
          <br />
          <input type="number" id="quantity" value={quantity} onChange={onChange} />
          <br />
          <br />
          <label htmlFor="stepNumber">stepNumber</label>
          <br />
          <input type="number" id="stepNumber" value={stepNumber} onChange={onChangeInstructions} />
          <br />
          <br />
          <label htmlFor="stepDescription">stepDescription</label>
          <br />
          <input type="text" id="stepDescription" value={stepDescription} onChange={onChangeInstructions} />
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