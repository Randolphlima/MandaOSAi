import { Component, OnInit } from '@angular/core';
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

import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// ===================== TIPAGEM =====================
interface Chamado {
  id: number;
  nome: string;
  descricao: string;
  endereco: string;
  complemento: string;
  status: string;
  contato: string;
  conexao: string;
}

interface StatusFilter {
  label: string;
  value: string;
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
    IonCardTitle, IonCol, IonGrid, IonRow, IonBadge,
    UpperCasePipe, CommonModule, IonSelect,
    IonSelectOption, FormsModule, IonLoading, HttpClientModule
  ]
})
export class HomeListOsPage implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
    private loadingCtrl: LoadingController
  ) { }

  // Lista completa vinda da API
  public chamados: Chamado[] = [];
  public chamadosFiltrados: Chamado[] = [];
  public statusSelecionado: string = 'todos';

  public statusOptions: StatusFilter[] = [
    { label: 'Todos', value: 'todos' },
    { label: 'Aberta', value: 'aberta' },
    { label: 'Execução', value: 'execucao' },
    { label: 'Pendente', value: 'pendente' },
    { label: 'Encerrada', value: 'encerrada' }
  ];

  ngOnInit() {
    this.carregarChamados();
  }

  // ===================== CHAMADA REAL DA API =====================
  async carregarChamados() {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando chamados...',
      spinner: 'crescent'
    });
    await loading.present();

    const url = 'https://goytanet.sgp.tsmx.com.br/api/os/list/';

    // form-data (igual ao Postman)
    const formData = new FormData();
    formData.append('token', '4fa5a0a5-5d9d-40f7-b0c9-f5052580d17a');
    formData.append('app', 'mikrotik');
    formData.append('filtro_data', '');
    formData.append('agendamento_inicial', '2025-11-01');
    formData.append('agendamento_final', '2025-12-09');

    this.http.post<any[]>(url, formData).subscribe({
      next: (response) => {
        this.chamados = response.map(item => {

          // Normalização do status
          let status = item.os_status_txt?.toLowerCase() || 'aberta';
          if (status.includes('exec')) status = 'execucao';
          if (status.includes('pend')) status = 'pendente';
          if (status.includes('encerr')) status = 'encerrada';

          return {
            id: item.os_id,
            nome: item.cliente,
            descricao: item.os_motivo_descricao,
            endereco: `${item.endereco_logradouro}, ${item.endereco_numero} - ${item.endereco_bairro}, ${item.endereco_cidade}`,
            complemento: item.endereco_complemento,
            status: status,
            contato: item.cliente_contato,
            conexao: item.servico_online ? 'Online' : 'Offline'
          } as Chamado;
        });

        this.filtrarChamados();
        loading.dismiss();
      },

      error: (err) => {
        console.error('Erro ao carregar chamados:', err);
        loading.dismiss();
      }
    });
  }

  // ===================== FILTROS =====================
  public filtrarChamados(): void {
    if (this.statusSelecionado === 'todos') {
      this.chamadosFiltrados = [...this.chamados];
    } else {
      this.chamadosFiltrados = this.chamados.filter(
        chamado => chamado.status === this.statusSelecionado
      );
    }
  }

  public getStatusLabel(): string {
    if (this.statusSelecionado === 'todos') return 'FILTRO';
    return this.statusOptions.find(op => op.value === this.statusSelecionado)?.label || 'Filtro';
  }

  // ===================== REFRESH REAL =====================
  public async refreshChamados() {
    this.carregarChamados();
  }

  // ===================== AÇÕES =====================
  abrirChamado(chamado: Chamado) {
    this.router.navigate(['/os-chamado-home'], { state: { chamado } });
  }

  abrirConfig() {
    this.router.navigate(['/home-config']);
  }

}
