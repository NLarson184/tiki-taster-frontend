import { Component, input } from '@angular/core';
import { Drink } from '../../models/drink';

@Component({
  selector: 'app-drink-card',
  imports: [],
  templateUrl: './drink-card.html',
  styleUrl: './drink-card.scss'
})
export class DrinkCard {
  // Required - The drink for this card
  drink = input<Drink>();

  // The calculated overall rating for this drink.
  // Based on the list of ratings attached to this drink.
  overallRating: string;

  constructor() {
    this.overallRating = this.calculateOverallRating();
  }

  calculateOverallRating(): string {
    if (this.drink()?.ratings == null || this.drink()?.ratings.length == 0) {
      return 'N/A';
    }
    const overallRatings = this.drink()?.ratings.map(rating => rating.overall_rating) ?? [];
    const sum = overallRatings.reduce((a, c) => a + c, 0);
    return (sum / overallRatings.length).toString();
  }
}
