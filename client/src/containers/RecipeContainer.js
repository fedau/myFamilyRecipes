import {useEffect, useState} from 'react'
import { Route, Router, Routes, useParams } from 'react-router-dom'
import RecipeList from '../components/RecipeList'
import Request from '../helpers/request'
import AddRecipe from './AddRecipe'
import Favourites from './Favourites'
import Homep from './Homep'
import { RecipeData } from '../interfaces'
import Recipe from '../components/Recipe'
import RecipeDetail from '../components/RecipeDetail'

const RecipeContainer = () => {

    const [ recipes, setRecipes] = useState([]);
    const [ ingredients, setIngredients] = useState([])
    const [ instructions, setInstructions] = useState([])
    const [recipe_ingredients, setRecipeIngredients] = useState([])
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
            setRecipeIngredients(data[2])
            setInstructions(data[3])
            setCategories(data[4])
        })
    }, [])
    

    const findRecipeById = (id) => {
        return recipes.find((recipe) => {
          return recipe.id === parseInt(id);
        })
      }
    
      const RecipeDetailWrapper = () => {
        const { id } = useParams();
        let foundRecipe = findRecipeById(id)
        // let foundRecipeIngredient = findByRecipeId(id)

    
        return <RecipeDetail recipe={foundRecipe} />;
      };
    

  return (
    <>

    <Routes>
        <Route path='/' element={<Homep recipes={recipes}/>}/>
        <Route path='/favorites' element={<Favourites recipes={recipes}/>}/>
        <Route path='/add' element={<AddRecipe recipes={recipes} categoryList={categories}/>}/>
        <Route path="/recipes/:id" element={<RecipeDetailWrapper />} />


    </Routes>
{/* do not put any text here or it loads everywhere */}

    </>
  )
}

export default RecipeContainer
