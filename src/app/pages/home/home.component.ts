import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { ProfileInfoComponent } from "@components/profile-info/profile-info.component";

@Component({
    selector: 'app-home',
    imports: [
        CommonModule,
        ProfileInfoComponent
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent { }
