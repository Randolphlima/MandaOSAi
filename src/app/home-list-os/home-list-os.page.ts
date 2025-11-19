import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  CommonModule, LowerCasePipe, UpperCasePipe
} from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonButton, IonMenuButton, IonIcon,
  IonCard, IonCardContent, IonCardHeader, IonCardSubtitle,
  IonCardTitle, IonCol, IonGrid, IonRow, IonBadge
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home-list-os',
  templateUrl: './home-list-os.page.html',
  styleUrls: ['./home-list-os.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonButton, IonMenuButton, IonIcon,
    IonCard, IonCardContent, IonCardHeader, IonCardSubtitle,
    IonCardTitle, IonCol, IonGrid, IonRow, IonBadge,
    LowerCasePipe, UpperCasePipe, CommonModule
  ]
})
export class HomeListOsPage {

  constructor(private router: Router) { }

  public chamados = [
    {
      id: 1,
      nome: 'Randolph Rodrigues Ribeiro Lima',
      descricao: 'Cliente sem conexão. Verificar roteador com defeito.',
      endereco: 'Rua Oscar Machado 135, 5 IPS',
      complemento: 'Bloco A APT 10',
      status: 'FINALIZADO',
      contato: '5522998536554'
    },
    {
      id: 2,
      nome: 'Maria da Silva',
      descricao: 'Lentidão na rede. Necessário testar ONU.',
      endereco: 'Av. Rosa Lima 455, Parque Califórnia',
      complemento: 'Portão Branco',
      status: 'ABERTO',
      contato: '5522998536554'
    },
    {
      id: 3,
      nome: 'RAPHAEL CHAGAS DE SOUSA',
      descricao: 'INSTALAÇÃO ISENTO DA TAXA.',
      endereco: 'RUA OSCAR MACHADO 209 CTO: 21°4652.04S 41°1933.46W PARQUE ROSÁRIO, CAMPOS DOS GOYTACAZES-RJ',
      complemento: 'AO LADO DA BARBEARIA SOUZA CASA DO MEIO ',
      status: 'PRIORIDADE',
      contato: '5522998536554'
    },
    {
      id: 4,
      nome: 'Jacinaide Lima de Moura de Freitas',
      descricao: 'INSTALAÇÃO ISENTO DA TAXA.',
      endereco: 'Travessa Carmem Careiro, 47, PQ PRESIDENTE VARGAS',
      complemento: 'Casa',
      status: 'PENDENTE',
      contato: '5522998536554'
    }
  ];

  abrirChamado(chamado: any) {
    this.router.navigate(['/os-chamado-home'], {
      state: { chamado }
    });
  }
}
