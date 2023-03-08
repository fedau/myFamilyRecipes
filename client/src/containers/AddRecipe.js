import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../components/Loading";
import { useState } from "react";
import '../css/form.scss'

import UploadImage from "../components/uploadImage";

const defaultFormData = {
  name: "",
  description: "",
  servings: 0,
  cookingTime: 0,
  image: "",
  categories: [],
  unit: "",
  quantity: 0,
  ingredientsName: "",
};

function AddRecipe({
  recipes,
  categoryList,
  handleRecipeSubmit,
  instructions,
  ingredientsState,
}) {
  const existingIngredients = ingredientsState.map((ingredient) => {
    return { id: ingredient.id, ingredientName: ingredient.ingredientName };
  });
  const [formData, setFormData] = useState(defaultFormData);
  const [instructionData, setInstructionData] = useState([
    { stepNumber: 0, stepDescription: "" },
  ]);
  const [recipeIngredientsData, setRecipeIngredientsData] = useState([
    {
      unit: "",
      ingredient: { id: "", ingredientName: "" },
      quantity: 0,
    },
  ]);
  // state for images
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  // function for image upload
  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImageUpload = async () => {};

  const handleCoverImage = async (file) => {
    setImageUrl(file);

  };

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
    const newInstructions = [
      ...instructionData,
      { stepNumber: 0, stepDescription: "" },
    ];
    setInstructionData(newInstructions);
  };

  // ON CHANGE RECIPE FIELDS
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleAddIngredient = () => {
    const newIngredient = [
      ...recipeIngredientsData,
      {
        unit: "",
        ingredient: { id: "", ingredientName: "" },
        quantity: 0,
      },
    ];
    setRecipeIngredientsData(newIngredient);
  };

  // ON CHANGE INGREDIENTS
  const onChangeIngredients = (e, changedIngredientIndex) => {
    let selectedIngredientName = e.target.value;
    let selectedIngredient = existingIngredients.find(
      (ingredient) => ingredient.ingredientName === selectedIngredientName
    );
    if (selectedIngredient === undefined) {
      selectedIngredient = { ingredientName: selectedIngredientName };
    }
    const newRecipeIngredients = recipeIngredientsData.map(
      (recipeIngredient, ingredientIndex) => {
        if (ingredientIndex === changedIngredientIndex) {
          console.log(selectedIngredient);
          return { ...recipeIngredient, ingredient: { ...selectedIngredient } };
        }
        return { ...recipeIngredient };
      }
    );
    setRecipeIngredientsData(newRecipeIngredients);
  };

  // ON CHANGE RECIPEINGREDIENTS
  const onChangeRecipeUnit = (e, index) => {
    const newRecipeIngredients = [...recipeIngredientsData];
    newRecipeIngredients[index].unit = e.target.value;
    setRecipeIngredientsData(newRecipeIngredients);
  };

  const onChangeRecipeQty = (e, index) => {
    const newRecipeIngredients = [...recipeIngredientsData];
    newRecipeIngredients[index].quantity = e.target.value;
    setRecipeIngredientsData(newRecipeIngredients);
  };

  // HANDLE IMAGE SUBMIT
  const handleImageSubmit = async (event) => {
    event.preventDefault();
    const { presignedUrl } = this.state;
    const file = this.fileInputRef.current.files[0];
    try {
      await fetch(presignedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });
      const imageUrl = presignedUrl.split("?")[0];
      this.setState({ imageUrl });
    } catch (error) {
      console.error(error);
    }
  };

  // on submit calls handlReciepSubmit in recipeContainer
  const onSubmit = (e) => {
    e.preventDefault();
    const newFormData = { ...formData };
    newFormData.unit = recipeIngredientsData.unit;
    newFormData.quantity = recipeIngredientsData.quantity;
    const categoriesForSubmit = formData.categories.map((category) => {
      const foundCategory = categoryList.find((c) => c.type === category);
      return foundCategory;
    });
    newFormData.categories = categoriesForSubmit;
    newFormData.instructions = instructionData;
    newFormData.recipeIngredients = recipeIngredientsData;
    newFormData.image = imageUrl;
    console.log(newFormData);
    handleRecipeSubmit(newFormData);
    setFormData(defaultFormData);
  };

  return (
    <>
    <div className="bodyForm">
      
        {/* <h1>Form</h1> */}
        <h2>Create a Recipe</h2>
        <form className="form" onSubmit={onSubmit}>
          {/* RECIPE INFO */}
          <label htmlFor="name">Title</label>

          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={onChange}
          />
      
          <label htmlFor="description">description</label>

          <input
            type="text"
            id="description"
            value={formData.description}
            onChange={onChange}
          />

          <label htmlFor="servings">servings</label>

          <input
            type="number"
            id="servings"
            value={formData.servings}
            onChange={onChange}
          />
       
          <label htmlFor="cookingTime">cookingTime</label>

          <input
            type="number"
            id="cookingTime"
            value={formData.cookingTime}
            onChange={onChange}
          />
         
          {/* INGREDIENTS */}
          {recipeIngredientsData.map((recipeIngredient, index) => (
            <div key={index}>
              <label htmlFor={`ingredientsName`}>ingredientsName</label>

              <input
                type="text"
                id={`ingredientsName${index}`}
                value={instructionData.ingredientsName}
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

              <label htmlFor={`unit${index}`}>unit</label>

              <input
                type="text"
                id={`unit${index}`}
                value={recipeIngredient.unit}
                onChange={(e) => onChangeRecipeUnit(e, index)}
              />

              <label htmlFor={`quantity${index}`}>quantity</label>

              <input
                type="number"
                id={`quantity${index}`}
                value={recipeIngredient.quantity}
                onChange={(e) => onChangeRecipeQty(e, index)}
              />
              <button
                onClick={() => {
                  const newRecipeIngredients = [...recipeIngredientsData];
                  newRecipeIngredients.splice(index, 1);
                  setRecipeIngredientsData(newRecipeIngredients);
                }}
              >
                Delete
              </button>
            </div>
          ))}
          <button type="button"  className={'button'}  onClick={handleAddIngredient}>
            Add ingredient
          </button>
          {/* STEPS DESCRIPTION  */}
          <div className="inputBoxWrapper">
            
            {instructionData.map((instruction, index) => (
              <div key={index}>
                <label>Step {index + 1}:</label>
                <input
                  type="number"
                  value={instruction.stepNumber}
                  onChange={(event) => handleStepChange(event, index)}
                />
                <label>Description:</label>
                <textarea
                  value={instruction.stepDescription}
                  onChange={(event) => handleDescriptionChange(event, index)}
                />
              </div>
            ))}
            
          </div>
          <button type="button" className={'button'}  onClick={handleAddInstruction}>
            Add Instruction
          </button>
          {/* ALL TYPES */}
          {/* mapping through all the existing types currently in the database */}
          {categoryList.map((category) => (
            <div key={category.id}>
              <label htmlFor={category.type}>
              <input
                type="checkbox"
                name="checkbox"
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
              />  {category.type} </label>
            </div>
          ))}

          {/* ADD IMAGE */}
          <UploadImage onUpload={handleCoverImage} />
          <button className={'button'} type="submit">Upload recipe</button>
        </form>
    </div>
    </>
  );
}
export default withAuthenticationRequired(AddRecipe, {
  onRedirecting: () => <Loading />,
});
