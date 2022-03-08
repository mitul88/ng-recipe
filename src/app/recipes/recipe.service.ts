import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.mode";
import { Recipe } from "./recipe.model";


export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
                'Samusa', 
                'A great evening snack', 
                'https://www.indianhealthyrecipes.com/wp-content/uploads/2019/11/samosa-recipe-480x270.jpg', 
                [
                    new Ingredient('flour', 1),
                    new Ingredient('meat', 1),
                ]
            ),
        new Recipe(
                'Singara', 
                'Great alternative for Samusa', 
                'https://www.indianhealthyrecipes.com/wp-content/uploads/2019/11/samosa-recipe-480x270.jpg', 
                [
                    new Ingredient('flour', 1),
                    new Ingredient('potato', 1),
                    new Ingredient('beans', 1),
                ]
            ),
      ]

      getRecipes() {
          return this.recipes.slice();
      }
}