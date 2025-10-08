import { Component, input, OnInit } from '@angular/core';
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

  // Decimal rating [0, 5]
  rating = input.required<number>();

  // The different stars to put in the row
  ratingStars: StarRatingDetails | undefined;

  ngOnInit() {
    this.ratingStars = this.calculateStars(this.rating());
  }

  // Round down to get the number of full stars
  private calculateStars(rating: number): StarRatingDetails {
    const filledStars = Array(Math.floor(rating)).fill(0);
    const halfStars = rating % 1 == 0 ? [] : [0]
    const emptyStars = Array(this.MAX_STAR_VALUE - (filledStars.length + halfStars.length)).fill(0);

    return {
      filledStars: filledStars,
      halfStars: halfStars,
      emptyStars: emptyStars
    }
  }
}
