import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonButton, IonFooter  } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login-home',
  templateUrl: './login-home.page.html',
  styleUrls: ['./login-home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonImg, IonButton, IonFooter, RouterModule]
})
export class LoginHomePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
