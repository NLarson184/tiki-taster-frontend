import {
  ChangeDetectorRef,
  Component,
  computed,
  inject,
  model,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BarService } from '../services/bar-service';
import { DrinkService } from '../services/drink-service';
import { Bar } from '../models/bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { Drink } from '../models/drink';
import { AsyncPipe } from '@angular/common';
import { StarRating } from '../common/star-rating/star-rating';
import {
  MatChipGrid,
  MatChipRow,
  MatChipInput,
  MatChipInputEvent,
  MatChipRemove,
} from '@angular/material/chips';
import { Tag } from '../models/tag';
import { TagService } from '../services/tag-service';
import { COMMA, ENTER, P } from '@angular/cdk/keycodes';
import { MatAnchor, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-add-rating',
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    StarRating,
    MatChipGrid,
    MatChipRow,
    MatChipInput,
    MatAnchor,
    MatButton,
    MatIcon,
    MatChipRemove,
  ],
  templateUrl: './add-rating.html',
  styleUrl: './add-rating.scss',
})
export class AddRating implements OnInit {
  barService = inject(BarService);
  drinkService = inject(DrinkService);
  tagService = inject(TagService);

  barList$: Observable<Bar[]>;
  tagList$: BehaviorSubject<Tag[]> = new BehaviorSubject<Tag[]>([]);
  drinkList: Drink[] = [];

  // Form Controls
  ratingForm = new FormGroup({
    barControl: new FormControl<Bar | null>(null, [Validators.required]),
    drinkControl: new FormControl<Drink | null>(null, [Validators.required]),
    overallRatingControl: new FormControl<number>(0, [
      Validators.required,
      Validators.min(1),
      Validators.max(5),
    ]),
    tasteRatingControl: new FormControl<number>(0, [Validators.min(1), Validators.max(5)]),
    presentationRatingControl: new FormControl<number>(0, [Validators.min(1), Validators.max(5)]),
    tagControl: new FormControl<Tag[]>([]),
    tagInputControl: new FormControl<string>(''),
  });
  formOutput = signal<any>(null);

  // Tag chip input details
  readonly currentTag = model('');
  readonly filteredTags = computed(() => {
    const currentTag = this.currentTag().toLowerCase();
    const baseList = this.tagList$.value.filter((tag) => !this.selectedTags().includes(tag.name));
    return currentTag
      ? baseList.filter((tag) => tag.name.toLowerCase().includes(currentTag))
      : baseList.slice();
  });
  readonly selectedTags = signal<string[]>([]);
  readonly separatorKeyCodes = [ENTER, COMMA] as const;

  constructor(private cd: ChangeDetectorRef) {
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

  setRatingControl(rating: number, formControlName: string): void {
    this.ratingForm.get(formControlName)?.setValue(rating);
  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    const isTagUnique = this.selectedTags().find((tag) => tag == value) == undefined;

    if (value && isTagUnique) {
      this.selectedTags.update((tagList) => [...tagList, value]);
    }

    console.log(this.ratingForm.get('tagInputControl'));
    this.ratingForm.get('tagInputControl')?.reset('');
    this.cd.detectChanges();
  }

  removeTag(tagName: string): void {
    // Try removing from the currently selected list
    const selectedTagIndex = this.selectedTags().indexOf(tagName);
    if (selectedTagIndex >= 0) {
      this.selectedTags.update((tagList) => {
        tagList.splice(selectedTagIndex, 1);
        return [...tagList];
      });
    }
  }

  autocompleteTagSelected(event: MatAutocompleteSelectedEvent): void {
    this.selectedTags.update((tagList) => [...tagList, event.option.viewValue]);
    this.ratingForm.get('tagInputControl')?.reset();
    this.cd.detectChanges();
    event.option.deselect();
  }

  submitForm() {
    this.formOutput.set(JSON.stringify(this.ratingForm.value, null, 2));
  }
}
