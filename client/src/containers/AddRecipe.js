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
    categories:[],
    unit: "",
    quantity:0,
    ingredientsName:"",
  };
  
  const instructionsFormData = {
    stepNumber: 0,
    stepDescription: "",
  };

function AddRecipe({recipes, categoryList, handleRecipeSubmit, instructions, ingredientsState,}) {
    const existingIngredients = ingredientsState.map(ingredient => {
        return {id: ingredient.id, name: ingredient.ingredientName}
    });
  const [formData, setFormData] = useState(defaultFormData);
  const [instructionData, setInstructionData] = useState([{ stepNumber: 0, stepDescription: '' }]);
  const [ingredientsData, setIngredientsData] = useState("")
  const [recipeIngredientData, setRecipeIngredientsData] = useState({ingredientsName: "", unit: "", quantity: 0 })
  // MULTIPLE INSTRUCTIONS STEPS
    const handleStepChange = (event, index) => {
      const newInstructions = [...instructionData];
      newInstructions[index].stepNumber = event.target.value;
      setInstructionData(newInstructions);
    };
  
    const handleDescriptionChange = (event, index) => {
      const newInstructions = [...instructionData];
      newInstructions[index].stepDescription = event.target.value;
      setInstructionData(newInstructions);
    };
  
    const handleAddInstruction = () => {
      const newInstructions = [...instructionData, { stepNumber: 0, stepDescription: '' }];
      setInstructionData(newInstructions);
    };
  
  // on change for when recipe in fields
    const onChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
    };
      // on change for when typing in fields
      const onChangeInstructions = (e) => {
        setInstructionData((prevState) => ({
          ...prevState,
          [e.target.id]: e.target.value,
        }));
      };
// ON CHANGE INGREDIENTS
      const onChangeIngredients = (e) => {
        let ingredientName = e.target.value;

        const newRecipeIngredients = {... recipeIngredientData}
        newRecipeIngredients.ingredientsName = ingredientName
        setRecipeIngredientsData(newRecipeIngredients)
      }
// ON CHANGE RECIPEINGREDIENTS
      const onChangeRecipeUnit = (e) => {
        const newRecipeIngredients = {... recipeIngredientData}
        newRecipeIngredients["unit"] = e.target.value;
        setRecipeIngredientsData(newRecipeIngredients)

        console.log(newRecipeIngredients);

      }
      const onChangeRecipeQty = (e) => {
        const newRecipeIngredients = {... recipeIngredientData}
        newRecipeIngredients["quantity"] = e.target.value;
        setRecipeIngredientsData(newRecipeIngredients)
      }
  // on submit calls handlReciepSubmit in recipeContainer
    const onSubmit = (e) => {
      e.preventDefault();
      const newFormData = {... formData}
      newFormData.unit = recipeIngredientData.unit;
      newFormData.quantity = recipeIngredientData.quantity
    let foundIngredient = null;
    for(let ingredient of ingredientsState){
        if(ingredient.id == recipeIngredientData.ingredientsName){
            recipeIngredientData.ingredient = ingredient
        }
    }
      const categoriesForSubmit = formData.categories.map(category => {
        const foundCategory = categoryList.find(c => c.type === category);
        return foundCategory;
      })
      newFormData.categories = categoriesForSubmit
      newFormData.instructions = instructionData
      newFormData.recipeIngredients = [recipeIngredientData]
      console.log(newFormData);
      handleRecipeSubmit(newFormData)
      setFormData(defaultFormData);
    };

    return (
      <>
        <h1>Form</h1>
        <p>Create a post</p>
  
        <form onSubmit={onSubmit}>
          {/* RECIPE INFO */}
          <label htmlFor="name">Title</label>
          <br />
          <input type="text" id="name" value={formData.name} onChange={onChange} />
          <br />
          <br />
          <label htmlFor="description">description</label>
          <br />
          <input type="text" id="description" value={formData.description} onChange={onChange} />
          <br />
          <br />
          <label htmlFor="servings">servings</label>
          <br />
          <input type="number" id="servings" value={formData.servings} onChange={onChange} />
          <br />
          <br />
          <label htmlFor="cookingTime">cookingTime</label>
          <br />
          <input type="number" id="cookingTime" value={formData.cookingTime} onChange={onChange} />
          <br />
          <br />
          {/* INGREDIENTS */}
          <label htmlFor="ingredientsName">ingredientsName</label>
<br />
<input type="text" id="ingredientsName" value={instructionData.ingredientsName} onChange={onChangeIngredients} list="ingredients" />
<datalist id="ingredients">
  {existingIngredients.map((ingredient) => {
    return <option value={ingredient.id}>{ingredient.name}</option>}
  )}
</datalist>
          <br />
          <label htmlFor="unit">unit</label>
          <br />
          <input type="text" id="unit" value={recipeIngredientData.unit} onChange={onChangeRecipeUnit} />
          <br />
          <label htmlFor="quantity">quantity</label>
          <br />
          <input type="number" id="quantity" value={recipeIngredientData.quantity} onChange={onChangeRecipeQty} />
          <br />
          <br />
          {/* STEPS DESCRIPTION  */}
          {instructionData.map((instruction, index) => (
        <div key={index}>
          <label>Step {index + 1}:</label>
          <input type="number" value={instruction.stepNumber} onChange={(event) => handleStepChange(event, index)} />
          <label>Description:</label>
          <textarea value={instruction.stepDescription} onChange={(event) => handleDescriptionChange(event, index)} />
        </div>
      ))}
      <button type="button" onClick={handleAddInstruction}>Add Instruction</button>

        {/* ALL TYPES */}
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
    {/* ADD IMAGE */}
          <br />
          <br />
          <label htmlFor="image">image</label>
          <br />
          <input type="text" id="image" value={formData.image} onChange={onChange} />
          <br />
          <br />
          <button type="submit">Upload post</button>
        </form>
      </>
      
    );
  
}


  export default  withAuthenticationRequired(AddRecipe, {
      onRedirecting: () => <Loading />,
    })
