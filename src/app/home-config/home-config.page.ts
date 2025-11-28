import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonMenuButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonInput,
  IonToggle,
  IonModal,
  IonIcon
} from '@ionic/angular/standalone';

type CampoEditavel = 'apelido' | 'celular' | 'senha';

@Component({
  selector: 'app-home-config',
  standalone: true,
  templateUrl: './home-config.page.html',
  styleUrls: ['./home-config.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonMenuButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonList,
    IonItem,
    IonLabel,
    IonText,
    IonInput,
    IonToggle,
    IonModal,
    IonIcon
  ]
})
export class HomeConfigPage {

  usuario: {
    empresa: string;
    nome: string;
    apelido: string;
    celular: string;
  } = {
      empresa: 'Minha Empresa LTDA',
      nome: 'João da Silva',
      apelido: 'João',
      celular: '(11) 99999-9999'
    };

  permissoes = {
    localizacao: true,
    alerta: false
  };

  modalAberto = false;
  campoEditando: CampoEditavel = 'apelido';
  campoEditandoLabel = '';
  campoValor: string = '';

  abrirModalEditar(campo: CampoEditavel) {
    this.campoEditando = campo;

    const labels: Record<CampoEditavel, string> = {
      apelido: 'Apelido',
      celular: 'Celular',
      senha: 'Senha'
    };

    this.campoEditandoLabel = labels[campo];

    this.campoValor = campo === 'senha'
      ? ''
      : this.usuario[campo];

    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
  }

  salvarAlteracao() {
    if (this.campoEditando !== 'senha') {
      this.usuario[this.campoEditando] = this.campoValor;
    }

    console.log('Alterado:', this.campoEditando, this.campoValor);

    this.fecharModal();
  }

  logout() {
    console.log('Usuário saiu.');
  }
}
