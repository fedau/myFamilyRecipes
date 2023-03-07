import { useState, useEffect } from "react";
import Recipe from "../components/Recipe";

const Homep = ({recipes, categoryList}) => {
    const [searchInput, setSearchInput] = useState("");
    const [formData, setFormData] = useState({
      categories: [],
    });
    
    const handleFavorite = () =>{

    }
    
    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    useEffect(() => {
        const filteredRecipes = recipes.filter(recipe => {
            const categoryMatch = formData.categories.length === 0 ||
                recipe.categories.some(category => formData.categories.includes(category.type));
            const searchMatch = searchInput.length === 0 ||
                recipe.name.toLowerCase().includes(searchInput.toLowerCase());
            return categoryMatch && searchMatch;
        });
        setFilteredRecipes(filteredRecipes);
    }, [recipes, formData, searchInput]);

    const [filteredRecipes, setFilteredRecipes] = useState(recipes);

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
      <input
          type="text"
          placeholder="Search here"
          onChange={handleChange}
          value={searchInput}
      />

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
