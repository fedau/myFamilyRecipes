import React from "react";
import Recipe from "../components/Recipe";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";

const Favourites = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  const requestAllFavorites = () => {
    fetch(`/api/favorites`)
      .then((response) => response.json())
      .then((data) => {
        setFavoriteRecipes(data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    requestAllFavorites();
  }, []);

  const { user } = useAuth0();
  if (favoriteRecipes.length === 0) {
    return <p>Loading...</p>;
  }

  const recipeElements = favoriteRecipes.map((recipe, index) => {
    if (recipe.userId === user.sub) {
      return (
        <div key={index} className="module">
          <Recipe recipe={recipe.recipe} />
        </div>
      );
    }
    return "";
  });
  return (
    <>
      <p>Your favorites page</p>
      <div className="grid">{recipeElements}</div>
    </>
  );
};

export default withAuthenticationRequired(Favourites, {
  onRedirecting: () => <Loading />,
});
