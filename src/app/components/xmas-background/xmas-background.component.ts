import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-xmas-background',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './xmas-background.component.html',
  styleUrls: ['./xmas-background.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class XmasBackgroundComponent {
  snowflakes = Array(15).fill(0);
}
