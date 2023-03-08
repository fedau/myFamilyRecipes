import React from 'react'
import { Link } from 'react-router-dom';
import '../css/Homep.css'
const Recipe = ({recipe}) => {
  

    if(!recipe){
        return "still loading"
    }
    const url ="/recipes/" + recipe.id;



  return (
<>
{/* link for each recipe */}

      <div className="card" style={{ backgroundSize:"cover", backgroundImage:`url(${recipe.image})` }}>
    <Link to={url}>
      {/* <img className={"recipe"} src={recipe.image} alt="error no"  /> */}
      <div className="content">
        <h2 className="title">{recipe.name}</h2>
        <p className="copy">{recipe.description} <br/> Servings: {recipe.servings}</p>
      </div>
    </Link>
        <button className="">hart</button>
    </div>






</>
  )
}

export default Recipe
