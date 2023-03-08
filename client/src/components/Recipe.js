import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Homep.css";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

const Recipe = ({ recipe, handleFavorite }) => {
  const [favoriteSelected, setFavoriteSelected] = useState([]);

  const { user } = useAuth0();
  const handleClickFavorites = () => {
    const sanitizedRecipeIngredients = recipe.recipeIngredients.map((ri) => {
      const copyOfrecipeIngredients = { ...ri };
      delete copyOfrecipeIngredients.recipe;
      return copyOfrecipeIngredients;
    });
    recipe.recipeIngredients = sanitizedRecipeIngredients;
    const data = {
      recipe: recipe,
      userId: user.sub,
    };
    setFavoriteSelected([...favoriteSelected, data]);
    handleFavorite(data);
  };
  const { isAuthenticated } = useAuth0();

  if (!recipe) {
    return "still loading";
  }
  const url = "/recipes/" + recipe.id;

  return (
    <>
      {/* link for each recipe */}

      <div
        className="card"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(${recipe.image})`,
        }}
      >
        <Link to={url}>
          {/* <img className={"recipe"} src={recipe.image} alt="error no"  /> */}
          <div className="content">
            <h2 className="title">{recipe.name}</h2>
            <p className="copy">
              {recipe.description} <br /> Servings: {recipe.servings}
            </p>
          </div>
        </Link>
        {isAuthenticated && (
          <button
            onClick={handleClickFavorites}
            style={{
              background: "none",
              color: "red",
              fontSize: "large",
              border: "none",
              position: "absolute",
              bottom: "10px",
              left: "10px",
            }}
          >
            <FontAwesomeIcon icon={solidHeart} />
          </button>
        )}
        {/* <FontAwesomeIcon icon="fa-solid fa-heart" /> */}
      </div>
    </>
  );
};

export default Recipe;
