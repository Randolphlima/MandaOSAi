import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonList, IonItem, IonInput, IonButton  } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login-home',
  templateUrl: './login-home.page.html',
  styleUrls: ['./login-home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonImg, IonList, IonItem, IonInput, IonButton]
})
export class LoginHomePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
