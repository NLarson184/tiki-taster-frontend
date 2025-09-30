import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-side-nav',
  imports: [MatToolbarModule, RouterLink],
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.scss'
})
export class SideNav {

}
