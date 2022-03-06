import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('Samusa', 'A great evening snack', 'https://www.indianhealthyrecipes.com/wp-content/uploads/2019/11/samosa-recipe-480x270.jpg'),
    new Recipe('Singara', 'Great alternative for Samusa', 'https://www.indianhealthyrecipes.com/wp-content/uploads/2019/11/samosa-recipe-480x270.jpg'),
  ]

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }

}
