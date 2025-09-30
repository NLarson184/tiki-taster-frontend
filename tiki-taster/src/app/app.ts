import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNav } from "./common/side-nav/side-nav";
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideNav, MatDividerModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('tiki-taster');
}
