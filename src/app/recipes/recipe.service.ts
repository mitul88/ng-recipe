import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.mode";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
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

      constructor(private slService: ShoppingListService) {}

      getRecipes() {
          return this.recipes.slice();
      }

      addIngredientsToShoppinList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
      }
}