import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  CommonModule, UpperCasePipe
} from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonButton, IonMenuButton, IonIcon,
  IonCard, IonCardContent, IonCardHeader,
  IonCardTitle, IonCol, IonGrid, IonRow, IonBadge,
  // Importe o IonSelect, IonSelectOption e FormsModule (para ngModel)
  IonSelect, IonSelectOption
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms'; // Importar FormsModule para ngModel

// Definição do tipo para o objeto de Chamado para melhor tipagem
interface Chamado {
  id: number;
  nome: string;
  descricao: string;
  endereco: string;
  complemento: string;
  status: string; // 'encerrada', 'aberta', 'execucao', 'pendente'
  contato: string;
  conexao: string;
}

// Definição do tipo para as opções de filtro
interface StatusFilter {
  label: string;
  value: string; // O valor que será usado para filtrar
}

@Component({
  selector: 'app-home-list-os',
  templateUrl: './home-list-os.page.html',
  styleUrls: ['./home-list-os.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonButton, IonMenuButton, IonIcon,
    IonCard, IonCardContent, IonCardHeader,
    IonCardTitle, IonCol, IonGrid, IonRow, IonBadge, UpperCasePipe, CommonModule,
    // Adicionar IonSelect, IonSelectOption e FormsModule
    IonSelect, IonSelectOption, FormsModule
  ]
})
export class HomeListOsPage {

  constructor(private router: Router) {
    // Inicializa a lista filtrada com todos os chamados na construção
    this.chamadosFiltrados = [...this.chamados];
  }

  // Lista completa de chamados (imutável)
  public chamados: Chamado[] = [
    {
      id: 1,
      nome: 'Randolph Rodrigues Ribeiro Lima',
      descricao: 'Cliente sem conexão. Verificar roteador com defeito.',
      endereco: 'Rua Oscar Machado 135, 5 IPS',
      complemento: 'Bloco A APT 10',
      status: 'encerrada',
      contato: '5522998536554',
      conexao: 'Offline'
    },
    {
      id: 2,
      nome: 'Maria da Silva',
      descricao: 'Lentidão na rede. Necessário testar ONU.',
      endereco: 'Av. Rosa Lima 455, Parque Califórnia',
      complemento: 'Portão Branco',
      status: 'aberta',
      contato: '5522998536554',
      conexao: 'Offline'
    },
    {
      id: 3,
      nome: 'RAPHAEL CHAGAS DE SOUSA',
      descricao: 'INSTALAÇÃO ISENTO DA TAXA.',
      endereco: 'RUA OSCAR MACHADO 209 CTO: 21°4652.04S 41°1933.46W PARQUE ROSÁRIO, CAMPOS DOS GOYTACAZES-RJ',
      complemento: 'AO LADO DA BARBEARIA SOUZA CASA DO MEIO ',
      status: 'aberta',
      contato: '5522998536554',
      conexao: 'Online'
    },
    {
      id: 4,
      nome: 'Jacinaide Lima de Moura de Freitas',
      descricao: 'INSTALAÇÃO ISENTO DA TAXA.',
      endereco: 'Travessa Carmem Careiro, 47, PQ PRESIDENTE VARGAS',
      complemento: 'Casa',
      status: 'execucao',
      contato: '5522998536554',
      conexao: 'Online'
    }
    ,
    {
      id: 5,
      nome: 'Erbert Eduardo de Jesus Tavares',
      descricao: 'INSTALAÇÃO ISENTO DA TAXA.',
      endereco: 'Travessa Carmem Careiro, 47, PQ PRESIDENTE VARGAS',
      complemento: 'Casa',
      status: 'pendente',
      contato: '5522998536554',
      conexao: 'Online'
    }
  ];

  // Lista de chamados que será exibida no HTML (filtrada)
  public chamadosFiltrados: Chamado[] = [];

  // Variável para armazenar o status selecionado, inicia com 'Todos'
  public statusSelecionado: string = 'todos';

  // Opções de status para o <ion-select>
  public statusOptions: StatusFilter[] = [
    { label: 'Todos', value: 'todos' },
    { label: 'Aberta', value: 'aberta' },
    { label: 'Em Execução', value: 'execucao' },
    { label: 'Pendente', value: 'pendente' },
    { label: 'Encerrada', value: 'encerrada' }
  ];

  /**
   * Função que filtra a lista de chamados com base no status selecionado.
   * Chamada no evento (ionChange) do ion-select.
   */
  public filtrarChamados(): void {
    if (this.statusSelecionado === 'todos') {
      // Se 'Todos' estiver selecionado, exibe a lista completa
      this.chamadosFiltrados = [...this.chamados];
    } else {
      // Filtra os chamados cujo status corresponde ao valor selecionado
      this.chamadosFiltrados = this.chamados.filter(
        chamado => chamado.status === this.statusSelecionado
      );
    }
  }

  abrirChamado(chamado: Chamado) {
    this.router.navigate(['/os-chamado-home'], {
      state: { chamado }
    });
  }

  abrirConfig() {
    this.router.navigate(['/home-config']);
  }

  public getStatusLabel(): string {
    // 1. Se 'todos' estiver selecionado, exibe "FILTRO" no botão.
    if (this.statusSelecionado === 'todos') {
      return 'FILTRO';
    }

    // 2. Caso contrário, retorna o label correspondente ao status.
    const selected = this.statusOptions.find(
      option => option.value === this.statusSelecionado
    );

    // Retorna o label encontrado, ou 'Filtro' como fallback se houver algum erro.
    return selected ? selected.label : 'Filtro';
  }
  
}