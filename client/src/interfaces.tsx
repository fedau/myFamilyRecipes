export interface RecipeData{
    id: number,
    name: string,
    description: string,
    cookingTime: number,
    servings: number,
    image: string,
    categories: {
        id: number,
        type: string,
      }[];
    recipeIngredients:{
        id: number,
        unit: string,
        quantity: number
    }[];
    instructions:{
        id: number,
        stepNumber: number,
        description: string,
    }[],
}


export interface CategoriesData{
    id: number,
    type: string,
}

export interface IngredientsData{
    id: number,
    name: string,
}
