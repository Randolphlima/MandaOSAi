import { Component } from '@angular/core';
import {
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonButtons, 
  IonButton, 
  IonMenuButton, 
  IonIcon, 
  IonCard, 
  IonCardContent, 
  IonCardHeader, 
  IonCardSubtitle, 
  IonCardTitle
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
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
    IonCardTitle
  ]
})
export class HomePage { }
