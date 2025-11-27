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
  IonSelect, IonSelectOption, LoadingController, IonLoading
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
    IonSelect, IonSelectOption, FormsModule, IonLoading
  ]
})
export class HomeListOsPage {

  // INJETAR LoadingController no constructor
  constructor(private router: Router, private loadingCtrl: LoadingController) {
    // Inicializa a lista filtrada com todos os chamados na construção
    this.chamadosFiltrados = [...this.chamados];
  }

  // Lista completa de chamados (imutável)
  public chamados: Chamado[] = [
    // ... (Chamados 1 a 5)
    // Seus chamados 1 a 5
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

  // ... (ChamadosFiltrados, statusSelecionado e statusOptions permanecem)
  public chamadosFiltrados: Chamado[] = [];
  public statusSelecionado: string = 'todos';
  public statusOptions: StatusFilter[] = [
    { label: 'Todos', value: 'todos' },
    { label: 'Aberta', value: 'aberta' },
    { label: 'Execução', value: 'execucao' },
    { label: 'Pendente', value: 'pendente' },
    { label: 'Encerrada', value: 'encerrada' }
  ];

  // ... (filtrarChamados(), abrirChamado(), abrirConfig(), getStatusLabel() permanecem)
  public filtrarChamados(): void {
    if (this.statusSelecionado === 'todos') {
      this.chamadosFiltrados = [...this.chamados];
    } else {
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
    if (this.statusSelecionado === 'todos') {
      return 'FILTRO';
    }
    const selected = this.statusOptions.find(
      option => option.value === this.statusSelecionado
    );
    return selected ? selected.label : 'Filtro';
  }

  /**
   * Função para simular o refresh dos chamados.
   * 1. Mostra o loading indicator ("gif" de atualização).
   * 2. Simula a busca de dados (com um setTimeout).
   * 3. Atualiza a lista com novos dados.
   * 4. Esconde o loading indicator.
   */
  public async refreshChamados() {
    // 1. Mostrar o Loading Indicator (o "gif" de atualização)
    const loading = await this.loadingCtrl.create({
      message: 'Atualizando chamados...', // Mensagem que aparece para o usuário
      spinner: 'crescent', // Tipo de spinner, pode ser 'lines', 'crescent', 'dots', etc.
      duration: 2000 // Definir um valor grande ou omitir para controle manual
    });
    await loading.present();

    // Simulação da busca de novos dados do backend (substituir por sua chamada HTTP real)
    setTimeout(() => {
      // 3. Simular a inserção de um novo chamado (novos dados)
      const novoChamado: Chamado = {
        id: 6,
        nome: 'NOVO CHAMADO ATUALIZADO',
        descricao: 'Nova solicitação de serviço recebida.',
        endereco: 'Rua do Teste, 100',
        complemento: 'APT 101',
        status: 'execucao',
        contato: '5522999999999',
        conexao: 'Online'
      };

      // Adiciona o novo chamado APENAS se ele ainda não existir (para evitar duplicidade no teste)
      if (!this.chamados.find(c => c.id === novoChamado.id)) {
        this.chamados.push(novoChamado);
      }

      // Aplica o filtro atual (caso algum filtro estivesse ativo)
      this.filtrarChamados();

      // 4. Esconder o Loading Indicator
      loading.dismiss();

    }, 1500); // 1.5 segundos para simular a requisição de rede
  }

}