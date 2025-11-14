import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonIcon, // Adicione IonIcon
  IonButton,
  IonInput
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login-recovery',
  templateUrl: './login-recovery.page.html',
  styleUrls: ['./login-recovery.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButtons,
    IonBackButton,
    IonIcon, // Certifique-se que IonIcon está aqui
    IonButton,
    IonInput
  ]
})
export class LoginRecoveryPage implements OnInit {

  constructor(private navCtrl: NavController) { } // NavController já injetado

  goBack() {
    // Esta função será executada ao clicar no novo botão
    this.navCtrl.back();
  }

  ngOnInit() {
  }
}