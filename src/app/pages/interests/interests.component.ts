import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Interest } from '@model/types/interest';

@Component({
  selector: 'app-interests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './interests.component.html',
  styleUrl: './interests.component.scss'
})
export class InterestsComponent {
  interests: Interest[] = [
    {
      name: 'Watchmaking',
      image: 'watch.jpg'
    },
    {
      name: 'Sports',
      image: 'gym.jpg'
    },
    {
      name: 'Music',
      image: 'piano.jpg'
    }
  ];

  getLinkImage(image: string): string {
    return `url(assets/illustrations/${image})`;
  }
}
