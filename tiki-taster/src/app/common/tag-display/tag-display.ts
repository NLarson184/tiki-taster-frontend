import { Component, input } from '@angular/core';
import { Tag } from '../../models/tag';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-tag-display',
  imports: [MatChipsModule],
  templateUrl: './tag-display.html',
  styleUrl: './tag-display.scss'
})
export class TagDisplay {
  tagList = input<Tag[]>();
}
