import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular'; // Importe NavController
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login-recovery',
  templateUrl: './login-recovery.page.html',
  styleUrls: ['./login-recovery.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonIcon]
})
export class LoginRecoveryPage implements OnInit {

  constructor(private navCtrl: NavController) {} // Injete NavController

  goBack() {
    // Retorna para a página anterior no histórico de navegação
    this.navCtrl.back();
    
    // Alternativa: Se você sabe o caminho exato para onde voltar:
    // this.navCtrl.navigateBack('/login-home'); 
  }

  ngOnInit() {
  }

}