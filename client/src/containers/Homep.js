import React from 'react'
import Recipe from '../components/Recipe'

const Homep = ({recipes}) => {
    if(recipes.length === 0){
        return (<p>Loading...</p>)
    }

        const recipeElements = recipes.map((recipe, index) => {
            return(
                <li key={index}>
                    <div>
                        <Recipe recipe ={recipe} />
            
                    </div>
                    </li>

            )  
        })
  return (
    <div>
        <ul>
            {recipeElements}
        </ul>
    </div>
  )
}

export default Homep
