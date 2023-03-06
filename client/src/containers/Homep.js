import React, { useEffect, useState } from 'react'
import Recipe from '../components/Recipe'
import Request from '../helpers/request'


const Homep = ({recipes, categoryList}) => {
    // const [ recipes, setRecipes] = useState([]);
    // const [ ingredientsState, setIngredients] = useState([])
    // const [ instructions, setInstructions] = useState([])
    // const [recipeIngredients, setRecipeIngredients] = useState([])
    // const [categoryList, setCategories] = useState([])

    // useEffect(() => {
    //     const request = new Request();
    //     const RecipePromise = request.get('/api/recipes');
    //     const ingredientsPromise = request.get('/api/ingredients');
    //     const instructionsPromise = request.get('/api/instructions');
    //     const recipe_ingredientsPromise = request.get('/api/recipeIngredients');
    //     const categoriesPromise = request.get('/api/categories')

    //     Promise.all([RecipePromise, ingredientsPromise, instructionsPromise, recipe_ingredientsPromise, categoriesPromise])
    //     .then((data) => {
    //         setRecipes(data[0])
    //         setIngredients(data[1])
    //         setInstructions(data[2])
    //         setRecipeIngredients(data[3])
    //         setCategories(data[4])
    //     })
    // }, [])
  
    // const [categoryList, setCategories] = useState([])
    // useEffect(() => {
    //     const request = new Request();
    //     const categoriesPromise = request.get('/api/categories')

    //     Promise.all([ categoriesPromise])
    //     .then((data) => {
    //         setCategories(data)
    //     })
    // }, [])

    console.log(categoryList);
    const [formData, setFormData] = useState({
        categories: [],
      });
    
      useEffect(() => {
        // This code will run only once, after the component mounts and the page has fully loaded
      }, []);
      console.log(formData);
    
    if(recipes.length === 0){
        return (<p>Loading all the recipes...</p>)
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
        <>
   {formData.length ? 
    (<div>formData not empty</div>)
    : null
}


        <form>
        {categoryList ? (
    categoryList.map((category) => (
      <div key={category.id}>
        <input
          type="checkbox"
          id={category.type}
          value={category.type}
          checked={formData.categories.includes(category.type)}
          onChange={(e) => {
            const checked = e.target.checked;
            const categoryType = category.type;
            setFormData((prevState) => {
              if (checked) {
                return {
                  ...prevState,
                  categories: [...prevState.categories, categoryType],
                };
              } else {
                return {
                  ...prevState,
                  categories: prevState.categories.filter(
                    (c) => c !== categoryType
                  ),
                };
              }
            });
          }}
        />
        <label htmlFor={category.type}>{category.type}</label>
      </div>
    ))
  ) : (
    <p>Loading categories...</p>
  )}
</form>
      <div>
        <ul>
            {recipeElements}
        </ul>
    </div>
        </>
  )
}

export default Homep
