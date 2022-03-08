import { Recipe } from "./recipe.model";


export class RecipeService {
    private recipes: Recipe[] = [
        new Recipe('Samusa', 'A great evening snack', 'https://www.indianhealthyrecipes.com/wp-content/uploads/2019/11/samosa-recipe-480x270.jpg'),
        new Recipe('Singara', 'Great alternative for Samusa', 'https://www.indianhealthyrecipes.com/wp-content/uploads/2019/11/samosa-recipe-480x270.jpg'),
      ]

      getRecipes() {
          return this.recipes.slice();
      }
}