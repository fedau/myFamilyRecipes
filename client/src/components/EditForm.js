import { withAuthenticationRequired } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import Request from "../helpers/request";

const EditForm = ({ recipe, onEdit }) => {
  const defaultFormData = {
    id: recipe.id,
    name: recipe.name,
    description: recipe.description,
    servings: recipe.servings,
    cookingTime: recipe.cookingTime,
    image: recipe.image,
    categories: recipe.categories,
    unit: recipe.unit,
    quantity: recipe.quantity,
    ingredientsName: "",
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [ingredientsState, setIngredientState] = useState([])
  const [instructionData, setInstructionData] = useState([
    ...recipe.instructions
  ]);

  const existingIngredients = ingredientsState.map((ingredient) => {
    return { id: ingredient.id, ingredientName: ingredient.ingredientName };
  });
  const [recipeIngredients, setRecipeIngredientsRecipeId] = useState([

  ]);
  const findRecipeById = () => {
    fetch(`/api/recipeIngredients?recipeId=${recipe.id}`)
    .then((response) => response.json())
    .then((data) => {
      setRecipeIngredientsRecipeId(data);
    })
    .catch((error) => console.log(error));
  };
  useEffect(() => {
    findRecipeById();
  }, []);
  const [recipeIngredientsData, setRecipeIngredientsData] = useState([
    ...recipeIngredients
  ]);
    
    const requestAllIngredients = () => {
      fetch(`/api/ingredients`)
      .then((response) => response.json())
      .then((data) => {
        setIngredientState(data);
      })
      .catch((error) => console.log(error));
    };
    useEffect(() => {
      requestAllIngredients()
  }, []);
  // when database is loading
  if (!recipe) {
    return "waiting on the recipe";
  }
  
  // ON CHANGE RECIPE FIELDS
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
    console.log(formData);
  };
  const handleAddInstruction = () => {
    const newInstructions = [
      ...instructionData,
      { stepNumber: 0, stepDescription: "" },
    ];
    setInstructionData(newInstructions);
  };


// ON CHANGE INGREDIENT
  const handleAddIngredient = () => {
    const newIngredient = [
      ...recipeIngredients,
      {
        unit: "",
        ingredient: { id: "", ingredientName: "" },
        quantity: 0,
      },
    ];
    setRecipeIngredientsRecipeId(newIngredient);
  };
  const onChangeIngredients = (e, changedIngredientIndex) => {
    let selectedIngredientName = e.target.value;
    let selectedIngredient = existingIngredients.find(
      (ingredient) => ingredient.ingredientName === selectedIngredientName
    );
    if (selectedIngredient === undefined) {
      selectedIngredient = { ingredientName: selectedIngredientName };
    }
    const newRecipeIngredients = recipeIngredients.map(
      (recipeIngredient, ingredientIndex) => {
        if (ingredientIndex === changedIngredientIndex) {
          console.log(selectedIngredient);
          return { ...recipeIngredient, ingredient: { ...selectedIngredient } };
        }
        return { ...recipeIngredient };
      }
    );
    setRecipeIngredientsRecipeId(newRecipeIngredients);
  };

  // ON CHANGE RECIPE INGREDIENTS
  const onChangeRecipeUnit = (e, index) => {
    const newRecipeIngredients = [...recipeIngredients];
    newRecipeIngredients[index].unit = e.target.value;
    setRecipeIngredientsRecipeId(newRecipeIngredients);
  };

  const onChangeRecipeQty = (e, index) => {
    const newRecipeIngredients = [...recipeIngredients];
    newRecipeIngredients[index].quantity = e.target.value;
    setRecipeIngredientsRecipeId(newRecipeIngredients);
  };
  // handleinstructioncahnge
  const handleStepChange = (event, index, field) => {
    const { value } = event.target;
    const updatedInstructionData = [...instructionData];
    updatedInstructionData[index] = {
      ...updatedInstructionData[index],
      [field]: value
    };
    setInstructionData(updatedInstructionData);
  };
  
console.log(instructionData);
  // ON SUBMIT
  const onSubmit = (e) => {
    e.preventDefault();
    const newFormData = { ...formData };
    newFormData.unit = recipeIngredients.unit;
    newFormData.quantity = recipeIngredients.quantity;
    newFormData.instructions = instructionData;
    const sanitizedRecipeIngredients = recipeIngredients.map((ri) => {
      const copyOfrecipeIngredients = {...ri}
      delete copyOfrecipeIngredients.recipe
      return copyOfrecipeIngredients
    })
    newFormData.recipeIngredients = sanitizedRecipeIngredients;
    onEdit(newFormData);
  };

  return (
    <>
 
      <h1>Form</h1>
      <p>Edit this recipe</p>

      <form onSubmit={onSubmit}>
        {/* RECIPE INFO */}
        <label htmlFor="name">Title</label>
        <br />
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={onChange}
        />
        <br />
        <br />
        <label htmlFor="description">description</label>
        <br />
        <input
          type="text"
          id="description"
          value={formData.description}
          onChange={onChange}
        />
        <br />
        <br />
        <label htmlFor="servings">servings</label>
        <br />
        <input
          type="number"
          id="servings"
          value={formData.servings}
          onChange={onChange}
        />
        <br />
        <br />
        <label htmlFor="cookingTime">cookingTime</label>
        <br />
        <input
          type="number"
          id="cookingTime"
          value={formData.cookingTime}
          onChange={onChange}
        />
        <br />
        <br />
        {/* INGREDIENTS */}
        {recipeIngredients.map((aRecipeIngredient,  index) => (
          <div key={index}>

            <label htmlFor={`ingredientsName`}>ingredientsName</label>
            <br />
            <input
              type="text"
              id={`ingredientsName${index}`}
              value={aRecipeIngredient.ingredient.ingredientName}
              onChange={(e) => onChangeIngredients(e, index)}
              list="ingredients"
            />
            <datalist id="ingredients">
              {existingIngredients.map((ingredient) => {
                return (
                  <option key={ingredient.id} value={ingredient.ingredientName}>
                    {ingredient.ingredientName}
                  </option>
                );
              })}
            </datalist>

            <label>ingredient unit</label>
            
             <input
              type="text"
              id={`unit${index}`}
              value={aRecipeIngredient.unit}
              onChange={(e) => onChangeRecipeUnit(e, index)}
            />
            <label>ingredient quantity</label>
            <input
              type="number"
              id={`quantity${index}`}
              value={aRecipeIngredient.quantity}
              onChange={(e) => onChangeRecipeQty(e, index)}
            />
                <button onClick={() => {
      const newRecipeIngredients = [...recipeIngredients];
      newRecipeIngredients.splice(index, 1);
      setRecipeIngredientsRecipeId(newRecipeIngredients);
    }}>Delete</button>
          </div>
        ))}
        
        <button type="button" onClick={handleAddIngredient}>
          Add ingredient
        </button>
        {/* INSTRUCTIONS */}
{instructionData.map((instruction, index) => (
  <div key={index}>
    <label>stepNumber</label>
    <input
      type="number"
      value={instruction.stepNumber}
      onChange={(event) => handleStepChange(event, index, "stepNumber")}
    />
    <br />
    <label>stepDescription:</label>
    <textarea
      type="text"
      value={instruction.stepDescription}
      onChange={(event) => handleStepChange(event, index, "stepDescription")}
    />
        <button onClick={() => {
      const newInstructions = [...instructionData];
      newInstructions.splice(index, 1);
      setInstructionData(newInstructions);
    }}>Delete</button>
  </div>
  
))}
         <button type="button" onClick={handleAddInstruction}>
          Add Instruction
        </button>

        {/* TYPES */}
        {recipe.categories.map((category) => (
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
                    return {
                      ...prevState,
                      categories: [...prevState.categories, categoryType],
                    };
                  } else {
                    return {
                      ...prevState,
                      categories: prevState.categories.filter(
                        (c) => c !== categoryType
                      ),
                    };
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
        <input
          type="text"
          id="image"
          value={formData.image}
          onChange={onChange}
        />
        <br />
        <br />
        <button type="submit">Upload recipe</button>
      {/* <button onClick={window.location = '/'}>cancel</button> */}
      </form>
    </>
  );
};

export default withAuthenticationRequired(EditForm, {
  onRedirecting: () => <Loading />,
});
