import { Component, computed, inject, model, OnInit, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BarService } from '../services/bar-service';
import { DrinkService } from '../services/drink-service';
import { Bar } from '../models/bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { Drink } from '../models/drink';
import { AsyncPipe } from '@angular/common';
import { StarRating } from "../common/star-rating/star-rating";
import { MatChipGrid, MatChipRow, MatChipInput } from "@angular/material/chips";
import { Tag } from '../models/tag';
import { TagService } from '../services/tag-service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAnchor, MatButton } from "@angular/material/button";

@Component({
  selector: 'app-add-rating',
  imports: [AsyncPipe, ReactiveFormsModule, MatInputModule, MatSelectModule, MatFormFieldModule, MatAutocompleteModule, StarRating, MatChipGrid, MatChipRow, MatChipInput, MatAnchor, MatButton],
  templateUrl: './add-rating.html',
  styleUrl: './add-rating.scss'
})
export class AddRating implements OnInit {
  barService = inject(BarService)
  drinkService = inject(DrinkService)
  tagService = inject(TagService);

  barList$: Observable<Bar[]>;
  tagList$: BehaviorSubject<Tag[]> = new BehaviorSubject<Tag[]>([]);
  drinkList: Drink[] = [];

  // Form Controls
  ratingForm = new FormGroup({
    barControl: new FormControl<Bar | null>(null, [Validators.required]),
    drinkControl: new FormControl<Drink | null>(null, [Validators.required, Validators.min(1)]),
    overallRatingControl: new FormControl<number>(0, [Validators.required, Validators.min(1), Validators.max(5)]),
    tasteRatingControl: new FormControl<number>(0, [Validators.min(1), Validators.max(5)]),
    presentationRatingControl: new FormControl<number>(0, [Validators.min(1), Validators.max(5)]),
    tagControl: new FormControl<Tag[]>([]),
  })

  // Tag chip input details
  readonly addOnBlur = true;
  readonly separatorKeyCodes = [ENTER, COMMA] as const;
  readonly currentTag = model('');
  readonly selectedTagList = model<Tag[]>([]);
  readonly filteredTags = computed(() => {
    const currentTag = this.currentTag().toLowerCase();
    return currentTag ? this.tagList$.value.filter(tag => tag.name.toLowerCase().includes(currentTag)) : this.tagList$.value.slice();
  });

  constructor() {
    this.barList$ = this.barService.getAllBars();
    this.tagService.getAllTags().subscribe((tagList) => {
      this.tagList$.next(tagList);
    });
  }

  ngOnInit() {
    this.ratingForm.controls.barControl.valueChanges.subscribe((selectedBar) => {
      if (!selectedBar) {
        return;
      }

      // Update the drink list and clear the current selected drink when the bar changes.
      this.updateDrinkList(selectedBar!.id);
      this.ratingForm.controls.drinkControl.setValue(null);
    });
  }

  updateDrinkList(barId: number): void {
    this.barService.getDrinksAtBar(barId).subscribe((value) => {
      this.drinkList = value;
    });
  }

  drinkDisplayFn(drink: Drink): string {
    return drink?.name ?? '';
  }

  setOverallRating(rating: number): void {
    this.ratingForm.controls.overallRatingControl.setValue(rating);
  }

  setTasteRating(rating: number): void {
    this.ratingForm.controls.tasteRatingControl.setValue(rating);
  }

  setPresentationRating(rating: number): void {
    this.ratingForm.controls.presentationRatingControl.setValue(rating);
  }

  addTag(newTag: Tag): void {
    this.selectedTagList.update(tagList => [...this.selectedTagList(), newTag])
  }

  printForm() {
    console.log(this.ratingForm.value);
  }
}
