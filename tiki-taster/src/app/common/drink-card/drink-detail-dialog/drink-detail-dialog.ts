import { Component, inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Drink } from '../../../models/drink';
import { StarRating } from '../../star-rating/star-rating';
import { DrinkService } from '../../../services/drink-service';
import { TagDisplay } from '../../tag-display/tag-display';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-drink-detail-dialog',
  imports: [StarRating, TagDisplay, RouterLink],
  templateUrl: './drink-detail-dialog.html',
  styleUrl: './drink-detail-dialog.scss',
})
export class DrinkDetailDialog implements OnInit {
  data = inject(MAT_DIALOG_DATA);
  drinkService = inject(DrinkService);
  readonly dialogRef = inject(MatDialogRef<DrinkDetailDialog>);

  drink: Drink;
  barLinkActive: boolean;
  overall_rating: number | null;
  taste_rating: number | null;
  presentation_rating: number | null;

  constructor() {
    this.drink = <Drink>this.data.drink;
    this.barLinkActive = <boolean>this.data.barLinkActive;
    this.overall_rating = this.drink.average_overall_rating;
    this.taste_rating = this.drink.average_taste_rating;
    this.presentation_rating = this.drink.average_presentation_rating;
  }

  ngOnInit(): void {}

  closeDialog() {
    this.dialogRef.close();
  }
}
