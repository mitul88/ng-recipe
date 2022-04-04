import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { map, tap, take, exhaustMap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";


@Injectable({providedIn: "root"})
export class DataStorageService {
    constructor( 
        private http: HttpClient, 
        private recipeService: RecipeService,
        private authService: AuthService ){

    }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-recipebook-6dd2c-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json', recipes)
            .subscribe(response => {
                console.log(response);
            })
    }

    fetchRecipes() {
        return this.authService.user.pipe(
                take(1), exhaustMap(user => {
                return this.http
                .get<Recipe[]>(
                    'https://ng-recipebook-6dd2c-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',
                        {
                            params: new HttpParams().set('auth', user.token)
                        }
                    )
            }), map(recipes=>{
                return recipes.map(recipe=> {
                    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
                })
            }),
            tap(recipes=> {
                this.recipeService.setRecipes(recipes);
            } )
        )
    }
}