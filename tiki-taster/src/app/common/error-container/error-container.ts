import { Component, input } from '@angular/core';

@Component({
  selector: 'app-error-container',
  imports: [],
  templateUrl: './error-container.html',
  styleUrl: './error-container.scss',
})
export class ErrorContainer {
  errorMessage = input<string>('');
}
