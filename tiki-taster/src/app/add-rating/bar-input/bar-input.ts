import { Component } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/input';
import { MatSelect, MatOption } from '@angular/material/select';

@Component({
  selector: 'app-bar-input',
  imports: [MatFormField, MatLabel, MatSelect, MatOption],
  templateUrl: './bar-input.html',
  styleUrl: './bar-input.scss',
})
export class BarInput {
  barList = ['foo bar'];
}
