import {useEffect, useState} from 'react'
import { Route, Routes, useParams } from 'react-router-dom'
import Request from '../helpers/request'
import AddRecipe from './AddRecipe'
import Favourites from './Favourites'
import Homep from './Homep'
import RecipeDetail from '../components/RecipeDetail'

const RecipeContainer = () => {
    // states for all the api calls

    const [ recipes, setRecipes] = useState([]);
    const [ ingredients, setIngredients] = useState([])
    const [ instructions, setInstructions] = useState([])
    const [recipeIngredients, setRecipeIngredients] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const request = new Request();
        const RecipePromise = request.get('/api/recipes');
        const ingredientsPromise = request.get('/api/ingredients');
        const instructionsPromise = request.get('/api/instructions');
        const recipe_ingredientsPromise = request.get('/api/recipeIngredients');
        const categoriesPromise = request.get('/api/categories')

        Promise.all([RecipePromise, ingredientsPromise, instructionsPromise, recipe_ingredientsPromise, categoriesPromise])
        .then((data) => {
            setRecipes(data[0])
            setIngredients(data[1])
            setInstructions(data[2])
            setRecipeIngredients(data[3])
            setCategories(data[4])
        })
    }, [])
  
// this wrapper for a single recipe. Takes the id out of the url and puts the id on the single recipe
const RecipeDetailWrapper = () => {
  const { id } = useParams();
  const foundRecipe = recipes.find((recipe) => recipe.id === parseInt(id));
  return <RecipeDetail recipe={foundRecipe} />; 
};

//   FORM SUBMIT
const handleRecipeSubmit = (recipe, instructions) => {
    const request = new Request();
    request.post('/api/recipes', recipe)
    .then( () => request.post('/api/instructions', instructions))
    .then(() => {
        window.location = '/'
    })
}
      

      return (
          <>

    <Routes>
        <Route path='/' element={<Homep recipes={recipes}/>}/>
        <Route path='/favorites' element={<Favourites recipes={recipes}/>}/>
        <Route path='/add' element={<AddRecipe recipes={recipes} categoryList={categories} instructions={instructions} ingredients={ingredients} handleRecipeSubmit={handleRecipeSubmit}/>}/>
        <Route path="/recipes/:id" element={<RecipeDetailWrapper />} />


    </Routes>
    </>
  )
  
};

export default RecipeContainer
