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
import { MediaService } from '../services/media-service';
import { Bar } from '../models/bar';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
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
import { MatAnchor, MatButton, MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NewRating } from '../models/rating';
import { RatingService } from '../services/rating-service';
import { RouterLink } from '@angular/router';
import { BarSearchResult } from '../models/bar-search-result';
import { BarInput } from './bar-input/bar-input';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorContainer } from '../common/error-container/error-container';

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
    RouterLink,
    BarInput,
    ErrorContainer,
    MatMiniFabButton,
  ],
  templateUrl: './add-rating.html',
  styleUrl: './add-rating.scss',
})
export class AddRating implements OnInit {
  barService = inject(BarService);
  drinkService = inject(DrinkService);
  tagService = inject(TagService);
  ratingService = inject(RatingService);
  mediaService = inject(MediaService);

  barList$: Observable<Bar[]>;
  drinkList$: Observable<Drink[]>;
  tagList$: BehaviorSubject<Tag[]> = new BehaviorSubject<Tag[]>([]);

  formComplete = signal(false);

  selectedFile: File | null = null;
  filePreviewUrl: string | ArrayBuffer | null = null;

  // Form Controls
  ratingForm = new FormGroup({
    barControl: new FormControl<BarSearchResult | null>(null, [Validators.required]),
    drinkControl: new FormControl<string | null>({ value: null, disabled: true }, [
      Validators.required,
    ]),
    overallRatingControl: new FormControl<number>(0, [
      Validators.required,
      Validators.min(1),
      Validators.max(5),
    ]),
    tasteRatingControl: new FormControl<number>(0, [Validators.min(1), Validators.max(5)]),
    presentationRatingControl: new FormControl<number>(0, [Validators.min(1), Validators.max(5)]),
    tagControl: new FormControl<string[]>([]),
    tagInputControl: new FormControl<string>(''),
  });
  formOutput = signal<any>(null);

  // Bar/Drink input details
  selectedBarForDrinkList$ = new Subject<string>();

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

  // Error States
  duplicateDrinkReview = signal(false);
  duplicateDrinkErrorMessage = "Sorry! You can't rate the same drink at a bar more than once.";
  fileUploadError = signal(false);
  fileUploadErrorMessage = 'There was an issue uploading your image.  Try again!';

  constructor(private cd: ChangeDetectorRef) {
    // When the bar is selected, load the known drinks at this bar
    this.drinkList$ = this.selectedBarForDrinkList$.pipe(
      switchMap((placeId: string) => this.barService.getDrinksAtBar(placeId)),
    );

    this.barList$ = this.barService.getAllBars();
    this.tagService.getAllTags().subscribe((tagList) => {
      this.tagList$.next(tagList);
    });
  }

  ngOnInit() {}

  clearErrors() {
    this.duplicateDrinkReview.set(false);
    this.fileUploadError.set(false);
  }

  onBarSelected(selectedBar: BarSearchResult): void {
    // Enable the input since we have a bar now
    this.ratingForm.controls.drinkControl.enable();

    // Fill in the bar form control and trigger the drink list search
    this.ratingForm.controls.barControl.setValue(selectedBar);
    this.selectedBarForDrinkList$.next(selectedBar.fsq_place_id);

    // Reset the drink input since the bar has changed
    this.ratingForm.controls.drinkControl.setValue(null);
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

  onFileSelected(event: any) {
    const file = event.target.files?.[0];

    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.filePreviewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.selectedFile = null;
    this.filePreviewUrl = null;
  }

  submitForm() {
    let barObject = this.ratingForm.get('barControl')!.value!;

    // Create a new rating object
    const newRating: NewRating = {
      bar_id: barObject.fsq_place_id!,
      bar_name: barObject.name!,
      bar_address: barObject.formatted_address!,
      drink_name: this.ratingForm.get('drinkControl')!.value!,
      overall_rating: this.ratingForm.get('overallRatingControl')!.value!,
      taste_rating: this.ratingForm.get('tasteRatingControl')?.value ?? undefined,
      presentation_rating: this.ratingForm.get('presentationRatingControl')?.value ?? undefined,
      tag_list: this.ratingForm.get('tagControl')!.value ?? [],
      image_url: null,
    };

    if (this.selectedFile) {
      this.mediaService.uploadImage(this.selectedFile).subscribe({
        next: (result) => {
          newRating.image_url = result.secure_url;
          this.saveRating(newRating);
        },
        error: (error) => {
          this.clearErrors();
          this.fileUploadError.set(true);
        },
      });
    } else {
      this.saveRating(newRating);
    }
  }

  private saveRating(newRating: NewRating) {
    this.ratingService.createRating(newRating).subscribe({
      complete: () => this.formComplete.set(true),
      error: (error: HttpErrorResponse) => {
        this.clearErrors();
        var errorDetail: string = error.error.detail.toString();
        console.log(errorDetail);
        if (errorDetail == 'Duplicate drink/bar combo.') {
          this.duplicateDrinkReview.set(true);
        }
      },
    });
  }
}
