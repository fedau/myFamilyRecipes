import React from 'react'
import { Link } from 'react-router-dom';

const Recipe = ({recipe}) => {

    if(!recipe){
        return "still loading"
    }
    const url ="/recipes/" + recipe.id;
  return (
<>
{/* link for each recipe */}
<p>
    <Link to={url}>
      <img src={recipe.image} alt="error no" style={{ width: 200, height: 250 }} />
      <br/>

        {recipe.name} <br/> {recipe.description} <br/> {recipe.servings} servings
        {/* <img src={recipe.image} alt="no"/> */}
    </Link>

</p>


</>
  )
}

export default Recipe
