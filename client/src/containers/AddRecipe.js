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
    const existingIngredients = ingredientsState.map(ingredient => ingredient.ingredientName);
  const [formData, setFormData] = useState(defaultFormData);
  const [instructionData, setInstructionData] = useState([{ stepNumber: 0, stepDescription: '' }]);
  const [ingredientsData, setIngredientsData] = useState("")
  const [recipeIngredientData, setRecipeIngredientsData] = useState([])
  
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

      const onChangeIngredients = (e) => {
        let ingredientName = e.target.value;
        let existingIngredient = recipeIngredientData.find(ingredient => ingredient.name === ingredientName);
        if (existingIngredient) {
            setIngredientsData((prevState) => ({
            ...prevState,
            // unit: existingIngredient.unit,
            // quantity: existingIngredient.quantity,
            ingredientsName: ingredientName,
          }));
        } else {
            setIngredientsData((prevState) => ({
            ...prevState,
            ingredientsName: ingredientName,
          }));
        }
      }
      
      
    //   const onChangeIngredients = (e) => {
    //     setIngredientsData((prevState) => ({
    //         ...prevState,
    //         [e.target.id]: e.target.value,
    //     }))
    //   }

      const onChangeRecipeIngredients = (e) => {
        setRecipeIngredientsData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
      }
  // on submit calls handlReciepSubmit in recipeContainer
    const onSubmit = (e) => {
      e.preventDefault();
      const categoriesForSubmit = formData.categories.map(category => {
        const foundCategory = categoryList.find(c => c.type === category);
        return foundCategory;
      })

      const formDataForSubmit = {
        ...formData,
        categories: categoriesForSubmit
      }

  
      console.log(formDataForSubmit);
      console.log(instructionData);
      handleRecipeSubmit(formDataForSubmit, instructionData)
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
          {/* INGGEDIENTSS */}
          <label htmlFor="ingredientsName">ingredientsName</label>
<br />
<input type="text" id="ingredientsName" value={instructionData.ingredientsName} onChange={onChangeIngredients} list="ingredients" />
<datalist id="ingredients">
  {existingIngredients.map(ingredient => <option value={ingredient} />)}
</datalist>

          {/* <label htmlFor="ingredientsName">ingredientsName</label>
          <br />
          <input type="text" id="ingredientsName" value={formData.ingredientsName} onChange={onChangeIngredients} />
           */}
          <br />
          <label htmlFor="unit">unit</label>
          <br />
          <input type="text" id="unit" value={formData.unit} onChange={onChangeRecipeIngredients} />
          <br />
          <label htmlFor="quantity">quantity</label>
          <br />
          <input type="number" id="quantity" value={formData.quantity} onChange={onChangeRecipeIngredients} />
          <br />
          <br />
          {/* STEPS DESCRIPTION  */}
          {/* <label htmlFor="stepNumber">stepNumber</label>
          <br />
          <input type="number" id="stepNumber" value={instructionData.stepNumber} onChange={onChangeInstructions} />
          <br />
          <br /> */}
          {/* <label htmlFor="stepDescription">stepDescription</label>
          <br />
          <input type="text" id="stepDescription" value={instructionData.stepDescription} onChange={onChangeInstructions} />
          <br />
          <br />
          <label htmlFor="stepNumber2">stepNumber</label>
          <br />
          <input type="number" id="stepNumber" value={instructionData.stepNumber} onChange={onChangeInstructions} />
          <br />
          <br />
          <label htmlFor="stepDescription2">stepDescription</label>
          <br />
          <input type="text" id="stepDescription" value={instructionData.stepDescription} onChange={onChangeInstructions} />
          <br />
          <br /> */}
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