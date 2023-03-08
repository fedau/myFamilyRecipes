import {useEffect, useState} from 'react'
import { Route, Routes, useParams } from 'react-router-dom'
import Request from '../helpers/request'
import AddRecipe from './AddRecipe'
import Favourites from './Favourites'
import Homep from './Homep'
import RecipeDetail from '../components/RecipeDetail'
import EditForm from '../components/EditForm'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'


const RecipeContainer = () => {
  const navigate = useNavigate()
    // states for all the api calls
    const [ recipes, setRecipes] = useState([]);
    const [ ingredientsState, setIngredients] = useState([])
    const [ instructions, setInstructions] = useState([])
    const [recipeIngredients, setRecipeIngredients] = useState([])
    const [categories, setCategories] = useState([])
    const [ favoriteRecipes, setFavoriteRecipes] = useState([])

    useEffect(() => {
        const request = new Request();
        const RecipePromise = request.get('/api/recipes');
        const ingredientsPromise = request.get('/api/ingredients');
        const instructionsPromise = request.get('/api/instructions');
        const recipe_ingredientsPromise = request.get('/api/recipeIngredients');
        const categoriesPromise = request.get('/api/categories')
        const favoritespromise = request.get('/api/favorites')

        Promise.all([RecipePromise, ingredientsPromise, instructionsPromise, recipe_ingredientsPromise, categoriesPromise, favoritespromise])
        .then((data) => {
            setRecipes(data[0])
            setIngredients(data[1])
            setInstructions(data[2])
            setRecipeIngredients(data[3])
            setCategories(data[4])
            setFavoriteRecipes(data[5])
        })
    }, [])

    const refreshRecipeData = () => {
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
    }
    const { user } = useAuth0();

// console.log("user id:", user.sub);
  
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

// HANDLE FAVORITES
const handleFavorite = (favorites) =>{
    const request = new Request();
    request.post(`/api/favorites`, favorites)

}
// HANDLE DELETE
const handleDelete = (id) => {
    const request = new Request();
    const url = '/api/recipes/' + id;

    request.delete(url).then(() => {
      window.location = '/';
    })
  }
    const RecipeDetailWrapper = () => {
        const { id } = useParams();
        //   const foundRecipe = recipes.find((recipe) => recipe.id === parseInt(id));
        let foundRecipe = findRecipeById(id)
        return <RecipeDetail recipe={foundRecipe} handleDelete={handleDelete} />; 
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
        // .then(refreshRecipeData())
        .then(data => data.json())
        .then((data) => {
        //  navigate(`/recipes/${data.id}`)
        
        window.location = '/'
    }
        )
    }
    // const onEdit = (recipe) => {
    //     const request = new Request();
    //     request.put(`/api/recipes/${recipe.id}`, recipe)
    
    // }

      return (
          <>

    <Routes>
        <Route path='/' element={<Homep recipes={recipes} categoryList={categories} handleFavorite={handleFavorite} />}/>
        <Route path='/favorites' element={<Favourites />}/>
        <Route path='/:id/edit' element={ <RecipeEditFormWrapper  /> } />
        <Route path='/add' element={<AddRecipe recipes={recipes} categoryList={categories} instructions={instructions} ingredientsState={ingredientsState} handleRecipeSubmit={handleRecipeSubmit}/>}/>
        <Route path="/recipes/:id" element={<RecipeDetailWrapper />} />


    </Routes>
    </>
  )
  
};

export default RecipeContainer
