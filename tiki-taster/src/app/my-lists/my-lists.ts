import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { RatingService } from '../services/rating-service';
import { Rating } from '../models/rating';
import { AsyncPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-lists',
  imports: [AsyncPipe, MatTableModule, RouterLink],
  templateUrl: './my-lists.html',
  styleUrl: './my-lists.scss',
})
export class MyLists {
  ratingService = inject(RatingService);

  accountRatingList$!: Observable<Rating[]>;

  accountRatingDisplayedColumns = ['drink', 'bar', 'overall_rating'];

  constructor() {
    effect(() => {
      this.accountRatingList$ = this.ratingService.getAccountRatings();
    });
  }
}
