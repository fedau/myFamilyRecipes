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

 export interface RecipeIngredient {
    id: number;
    name: string;
  }


export interface RecipeIngredientQuantity {
    id: number;
    unit: string;
    recipe: RecipeData;
    ingredient: RecipeIngredient;
    quantity: number;
    // children?: React.ReactNode;
  }
  
