import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.mode";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
                'Samusa', 
                'A great evening snack', 
                'https://qph.fs.quoracdn.net/main-qimg-2bc9fd4b14f544e9b7d1a553eb809243', 
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

        getRecipe(index: number) {
            return this.recipes[index];
        }

        addIngredientsToShoppinList(ingredients: Ingredient[]) {
            this.slService.addIngredients(ingredients);
        }

        addRecipe(recipe: Recipe) {
            this.recipes.push(recipe);
            this.recipesChanged.next(this.recipes.slice());
        }

        updateRecipe(index: number, newRecipe: Recipe) {
            this.recipes[index] = newRecipe;
            this.recipesChanged.next(this.recipes.slice());
        }
}