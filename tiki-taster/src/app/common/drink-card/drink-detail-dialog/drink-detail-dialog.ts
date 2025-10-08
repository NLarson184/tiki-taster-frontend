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
import { StarRating } from "../../star-rating/star-rating";
import { DrinkService } from '../../../services/drink-service';
import { TagDisplay } from '../../tag-display/tag-display';

@Component({
  selector: 'app-drink-detail-dialog',
  imports: [StarRating, TagDisplay],
  templateUrl: './drink-detail-dialog.html',
  styleUrl: './drink-detail-dialog.scss'
})
export class DrinkDetailDialog implements OnInit {
  data = inject(MAT_DIALOG_DATA);
  drinkService = inject(DrinkService);

  drink: Drink;
  overall_rating: number;

  constructor() {
    this.drink = <Drink>this.data.drink;
    this.overall_rating = this.drinkService.calculateOverallRating(this.drink);
  }

  ngOnInit(): void {

  }
}
