import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonButton, IonMenuButton, IonIcon, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-list-map',
  templateUrl: './home-list-map.page.html',
  styleUrls: ['./home-list-map.page.scss'],
  standalone: true,
  imports: [IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonMenuButton,
    IonIcon,
    RouterModule,
    IonCard, 
    IonCardContent, 
    IonCardHeader, 
    IonCardSubtitle, 
    IonCardTitle]
})
export class HomeListMapPage { }
