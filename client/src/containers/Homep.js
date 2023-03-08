import { useState, useEffect } from "react";
import Recipe from "../components/Recipe";
import { useAuth0 } from "@auth0/auth0-react";
import "../css/Homep.css";
import "../css/CardEffect.scss";

const Homep = ({ recipes, categoryList, handleFavorite }) => {
  const [searchInput, setSearchInput] = useState("");
  const [favoriteSelected, setFavoriteSelected] = useState([]);
  const [formData, setFormData] = useState({
    categories: [],
  });

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    const filteredRecipes = recipes.filter((recipe) => {
      const categoryMatch =
        formData.categories.length === 0 ||
        recipe.categories.some((category) =>
          formData.categories.includes(category.type)
        );
      const searchMatch =
        searchInput.length === 0 ||
        recipe.name.toLowerCase().includes(searchInput.toLowerCase());
      return categoryMatch && searchMatch;
    });
    setFilteredRecipes(filteredRecipes);
  }, [recipes, formData, searchInput]);

  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  const recipeElements = filteredRecipes.map((recipe, index) => {
    return (
      <div key={index} className="module">
        <Recipe recipe={recipe} handleFavorite={handleFavorite} />
      </div>
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
            <div className="categoriesWrapper">
              <div key={category.id} className="SearchBar">
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
              </div>
              <label htmlFor={category.type}>{category.type}</label>
            </div>
          ))
        ) : (
          <p>Loading categories...</p>
        )}
      </form>
      {/* <div className="page-content"> */}

      <div className="grid">
        {recipeElements}

        {/* </div> */}
      </div>
    </>
  );
};

export default Homep;
