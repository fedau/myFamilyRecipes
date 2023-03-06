import { useState } from "react";
import Recipe from "../components/Recipe";

const Homep = ({recipes, categoryList}) => {

    const handleFavorite = () =>{

    }
    const [formData, setFormData] = useState({
      categories: [],
    });
    const filteredRecipes = formData.categories.length > 0
    ? recipes.filter(recipe =>
        recipe.categories.map(category => category.type)
        .some(categoryType => formData.categories.includes(categoryType)))
    : recipes;
  
    const recipeElements = filteredRecipes.map((recipe, index) => {
      return (
        <li key={index}>
          <div>
            <Recipe recipe={recipe} />
            <button onClick={handleFavorite}>hart me</button>
          </div>
        </li>
      );
    });
  
    return (
      <>
        <form>
          {categoryList ? (
            categoryList.map((category) => (
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
            ))
          ) : (
            <p>Loading categories...</p>
          )}
        </form>
  
        <div>
          <ul>
            {recipeElements}
          </ul>
        </div>
      </>
    );
  };
  
  export default Homep;
  