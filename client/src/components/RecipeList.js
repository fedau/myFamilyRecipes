import React from "react";
import Recipe from "./Recipe";

const RecipeList = ({ recipes }) => {
  if (recipes.length === 0) {
    return <p>Loading all the recipes...</p>;
  }

  const recipeElements = recipes.map((recipe, index) => {
    return (
      <li key={index}>
        <div>
          <Recipe recipe={recipe} />
        </div>
      </li>
    );
  });
  return (
    <div>
      <ul>{recipeElements}</ul>
      <p>Recipe list page</p>
    </div>
  );
};

export default RecipeList;
