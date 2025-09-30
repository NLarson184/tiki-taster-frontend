import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-side-nav',
  imports: [MatToolbarModule, RouterLink, MatButtonModule],
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.scss'
})
export class SideNav {

}
