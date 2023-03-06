import {useEffect, useState} from 'react'
import { Route, Routes, useParams } from 'react-router-dom'
import Request from '../helpers/request'
import AddRecipe from './AddRecipe'
import Favourites from './Favourites'
import Homep from './Homep'
import RecipeDetail from '../components/RecipeDetail'
import EditForm from '../components/EditForm'

const RecipeContainer = () => {
    
    // states for all the api calls
    const [ recipes, setRecipes] = useState([]);
    const [ ingredientsState, setIngredients] = useState([])
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
  

    const handleEditButtonClick = () => {

    }
    // this wrapper for a single recipe. Takes the id out of the url and puts the id on the single recipe
    const findRecipeById = (id) => {
        return recipes.find((recipe) => {
            return recipe.id === parseInt(id);
        })
    }
    const handlePut =(recipe) => {
        const request = new Request();
     request.put(`/api/recipes/${recipe.id}`, recipe).then(() => {
        window.location = '/'
    }) 
}
    const RecipeDetailWrapper = () => {
        const { id } = useParams();
        //   const foundRecipe = recipes.find((recipe) => recipe.id === parseInt(id));
        let foundRecipe = findRecipeById(id)
        return <RecipeDetail recipe={foundRecipe} />; 
    };
    
    const RecipeEditFormWrapper = ({ingredientsState}) => {
        const {id} = useParams();
        let foundRecipe = findRecipeById(id);
        return <EditForm recipe={foundRecipe} ingredientsState={ingredientsState} onEdit={handlePut} />
    }
    
    //   FORM SUBMIT
    const handleRecipeSubmit = ( recipe) => {
        const request = new Request();
        request.post('/api/recipes', {...recipe})
        .then(() => {
            window.location = `/`
        })
    }


      return (
          <>

    <Routes>
        <Route path='/' element={<Homep recipes={recipes} categoryList={categories}  />}/>
        <Route path='/favorites' element={<Favourites recipes={recipes}/>}/>
        <Route path='/:id/edit' element={ <RecipeEditFormWrapper /> } />
        <Route path='/add' element={<AddRecipe recipes={recipes} categoryList={categories} instructions={instructions} ingredientsState={ingredientsState} handleRecipeSubmit={handleRecipeSubmit}/>}/>
        <Route path="/recipes/:id" element={<RecipeDetailWrapper />} />


    </Routes>
    </>
  )
  
};

export default RecipeContainer
