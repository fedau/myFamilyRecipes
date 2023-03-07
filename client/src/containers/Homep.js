import { useState, useEffect } from "react";
import Recipe from "../components/Recipe";
import { useAuth0 } from '@auth0/auth0-react'


const Homep = ({recipes, categoryList, handleFavorite}) => {
    const [searchInput, setSearchInput] = useState("");
    const [favoriteSelected, setFavoriteSelected] = useState([])
    const [formData, setFormData] = useState({
      categories: [],
    });
    
    const { user } = useAuth0();

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    const handleClickFavorites = (recipe) => {
        const sanitizedRecipeIngredients = recipe.recipeIngredients.map((ri) => {
            const copyOfrecipeIngredients = {...ri}
            delete copyOfrecipeIngredients.recipe
            return copyOfrecipeIngredients
          })
          recipe.recipeIngredients = sanitizedRecipeIngredients
        const data = {
            
          recipe: recipe,
          userId: user.sub
        };
        console.log(recipe);
        console.log(data);
        setFavoriteSelected([...favoriteSelected, data]);
        handleFavorite(data)
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
            <button onClick={() => handleClickFavorites(recipe)}>hart me</button>

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
