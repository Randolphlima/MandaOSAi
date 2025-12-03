import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonInput,
  IonIcon,
  IonBackButton
} from '@ionic/angular/standalone';

// ✨ Correção 1: Importar e adicionar ícones
import { addIcons } from 'ionicons';
import { arrowBack } from 'ionicons/icons';

addIcons({ arrowBack });

@Component({
  selector: 'app-login-recovery',
  templateUrl: './login-recovery.page.html',
  styleUrls: ['./login-recovery.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonInput,
    IonIcon,
    FormsModule,
    CommonModule,
    IonIcon,
    IonBackButton
  ]
})

export class LoginRecoveryPage implements OnInit {

  constructor(private navCtrl: NavController) { } // NavController já injetado

  ngOnInit() {
  }

  goBack() {
    // Opção 1: Usando NavController do Ionic
    this.navCtrl.back();

    // Opção 2: Usando Location do Angular
    // this.location.back();
  }

}