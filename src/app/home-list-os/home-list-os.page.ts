import { Component, OnInit } from '@angular/core';
import { CommonModule, LowerCasePipe, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  IonCardTitle,
  IonCol,
  IonGrid,
  IonRow,
  IonBadge
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home-list-os',
  templateUrl: './home-list-os.page.html',
  styleUrls: ['./home-list-os.page.scss'],
  standalone: true,
  imports: [
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
    IonCardTitle,
    IonCol,
    IonGrid,
    IonRow,
    LowerCasePipe, 
    UpperCasePipe,
    IonBadge
  ]
})
export class HomeListOsPage {

  public chamado = {
  nome: 'Randolph Rodrigues Ribeiro Lima',
  descricao: 'Cliente sem conexão. Verificar roteador com defeito.',
  endereco: 'Rua Oscar Machado 135, Bloco A APT 105 IPS. Campos dos Goytacazes RJ',
  status: 'FINALIZADO' // Mude para 'ABERTO' para ver a cor vermelha (se você implementar o CSS para aberto)
};

 }
