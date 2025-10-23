import { Component, input, OnInit, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { StarRatingDetails } from './star-rating-details';

@Component({
  selector: 'app-star-rating',
  imports: [MatIconModule],
  templateUrl: './star-rating.html',
  styleUrl: './star-rating.scss'
})
export class StarRating implements OnInit {
  readonly MAX_STAR_VALUE = 5;

  // INPUTS
  readonly = input<boolean>(false);
  rating = input<number>(0); // Decimal rating [0, 5]

  // OUTPUT
  newRating = output<number>();

  // READONLY Section
  readonlyRatingStars: StarRatingDetails | undefined;

  // EDITABLE Section
  possibleStars: number[] = [];
  currentTrueRating: number = 0;
  tempHoverRating: number = 0;

  ngOnInit() {
    if (this.readonly()) {
      this.readonlyRatingStars = this.calculateFractionalStars(this.rating());
    } else {
      this.possibleStars = Array(this.MAX_STAR_VALUE).fill(0);
    }
  }

  // Builds out full, fractional, and empty stars for a decimal readonly rating
  //
  // Used when displaying an overall rating, which can be decimal.
  private calculateFractionalStars(rating: number): StarRatingDetails {
    const filledStars = Array(Math.floor(rating)).fill(0);
    const halfStars = rating % 1 == 0 ? [] : [0]
    const emptyStars = Array(this.MAX_STAR_VALUE - (filledStars.length + halfStars.length)).fill(0);

    return {
      filledStars: filledStars,
      halfStars: halfStars,
      emptyStars: emptyStars
    }
  }

  public getStarIconType(index: number): string {
    return (index + 1) > this.tempHoverRating ? 'star_border' : 'star';
  }

  public setHover(rating: number): void {
    this.tempHoverRating = rating;
  }

  public resetHover(): void {
    this.tempHoverRating = this.currentTrueRating;
  }

  // Output a new rating and set the current rating
  public setRating(rating: number): void {
    this.currentTrueRating = rating;
    this.tempHoverRating = rating;
    this.newRating.emit(this.currentTrueRating);
  }
}
