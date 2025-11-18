import { Component } from '@angular/core';
import {
  IonAvatar,
  IonList,
  IonItem,
  IonIcon,
  IonMenuToggle,
  IonLabel
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [
    IonAvatar,
    IonList,
    IonItem,
    IonIcon,
    IonMenuToggle,
    IonLabel,
    RouterModule
  ],
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent { }
