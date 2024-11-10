import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import dayjs from 'dayjs';
import { AnimationOptions } from 'ngx-lottie';
import { LottieComponent } from 'ngx-lottie';
import { MarkedPipe } from "@pipes/marked.pipe";

@Component({
  selector: 'ProfileInfo',
  standalone: true,
  imports: [CommonModule, LottieComponent, TranslatePipe, MarkedPipe],
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.scss'
})
export class ProfileInfoComponent implements OnInit {
  age = '';
  options: AnimationOptions = {
    path: 'assets/lottie/animation.json',
    renderer: 'canvas' as any
  };

  ngOnInit(): void {
    setInterval(() => {
      const result = dayjs().diff(dayjs(1047423600000), 'year', true);
      this.age = result.toString().substring(0, 12);
    }, 50);
  }
}
