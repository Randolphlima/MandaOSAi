import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Angular Standalone imports
import { CommonModule, NgIf, NgClass } from '@angular/common';

// Ionic Standalone imports
import {
  IonContent,
  IonButton,
  IonIcon,
  IonBadge,
  IonItem,
  IonInput,
  IonLabel,
  IonTextarea
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-os-chamado-home',
  templateUrl: './os-chamado-home.page.html',
  styleUrls: ['./os-chamado-home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    NgClass,

    // Ionic components
    IonContent,
    IonButton,
    IonIcon,
    IonBadge,
    IonItem,
    IonInput,
    IonLabel,
    IonTextarea
  ],
})
export class OsChamadoHomePage {

  
  chamado: any;
  aba = "dados";

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.chamado = nav?.extras.state?.['chamado'];
  }

  voltar() {
    this.router.navigate(['/home-list-os']);
  }

  ligar(numero: string) {
    window.open(`tel:${numero}`, '_system');
  }

  abrirWhatsApp(numero: string) {
    // remove caracteres não numéricos
    const celular = numero.replace(/\D/g, '');
    const msg = encodeURIComponent("Olá! Estou entrando em contato sobre seu chamado.");
    window.open(`https://wa.me/${celular}?text=${msg}`, '_system');
  }

  copiarTexto(valor: string) {
    navigator.clipboard.writeText(valor);
  }
  
}
