import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { RecipeData, CategoriesData, RecipeIngredient } from "../interfaces";
import Loading from "../components/Loading";
import { useState } from "react";
import Request from "../helpers/request";

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

  const handleImageUpload = async () => {
       
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
    // newFormData.image = imageUrl;
    console.log(newFormData);
    handleRecipeSubmit(newFormData);
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
        {recipeIngredientsData.map((recipeIngredient, index) => (
          <div key={index}>
            <label htmlFor={`ingredientsName`}>ingredientsName</label>
            <br />
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
            <br />
            <label htmlFor={`unit${index}`}>unit</label>
            <br />
            <input
              type="text"
              id={`unit${index}`}
              value={recipeIngredient.unit}
              onChange={(e) => onChangeRecipeUnit(e, index)}
            />
            <br />
            <label htmlFor={`quantity${index}`}>quantity</label>
            <br />
            <input
              type="number"
              id={`quantity${index}`}
              value={recipeIngredient.quantity}
              onChange={(e) => onChangeRecipeQty(e, index)}
            />
            <br />
            <br />
            <button onClick={() => {
      const newRecipeIngredients = [...recipeIngredientsData];
      newRecipeIngredients.splice(index, 1);
      setRecipeIngredientsData(newRecipeIngredients);
    }}>Delete</button>
          </div>
        ))}
        <button type="button" onClick={handleAddIngredient}>
          Add ingredient
        </button>

        {/* STEPS DESCRIPTION  */}
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
        <button type="button" onClick={handleAddInstruction}>
          Add Instruction
        </button>

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
        <br />
        {/* <br />
        <label htmlFor="image">image</label>
        <br />
        <input
          type="text"
          id="image"
          value={formData.image}
          onChange={onChange}
        /> */}

        {/* ADD IMAGE */}

        {imageUrl && <img src={imageUrl} alt="preview" />}
        <br />
        <input type="file" accept="image/*" onChange={handleFileInputChange} />
        <button type="button" onClick={handleImageUpload} disabled={!file}>
          Upload Image
        </button>
        <br />
        <button type="submit">Upload recipe</button>
      </form>
    </>
  );
}
export default withAuthenticationRequired(AddRecipe, {
  onRedirecting: () => <Loading />,
});
