import React from 'react'
import Recipe from '../components/Recipe'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from '../components/Loading';

const Favourites = ({recipes}) => {
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
    <p>favorites page</p>
      
    </div>
  )
}

export default  withAuthenticationRequired( Favourites, {
    onRedirecting: () => <Loading />
  });
