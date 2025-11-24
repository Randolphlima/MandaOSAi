import { Component, ChangeDetectorRef } from '@angular/core'; // Adicionado ChangeDetectorRef
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonButton,
  IonIcon,
  IonBadge,
  IonItem,
  IonInput,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  AlertController,
  LoadingController,
  ActionSheetController
} from '@ionic/angular/standalone';
import { ViewDidEnter } from '@ionic/angular';
import * as L from 'leaflet';
import { Capacitor } from '@capacitor/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-os-chamado-home',
  templateUrl: './os-chamado-home.page.html',
  styleUrls: ['./os-chamado-home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonButton,
    IonIcon,
    IonBadge,
    IonItem,
    IonInput,
    IonLabel,
    IonGrid,
    IonRow,
    IonCol,
  ],
})
export class OsChamadoHomePage implements ViewDidEnter {

  chamado: any;
  aba = 'dados';
  fotos: string[] = [];

  private map!: L.Map;
  private mapLoaded = false;
  private storageKey: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private actionSheetController: ActionSheetController,
    private cd: ChangeDetectorRef // Injetado ChangeDetectorRef
  ) {
    const nav = this.router.getCurrentNavigation();
    this.chamado = nav?.extras.state?.['chamado'];

    if (this.chamado?.id) {
      this.storageKey = `fotos_chamado_${this.chamado.id}`;
    }
    this.carregarFotosDoCache();
  }

  // --- Métodos do Ciclo de Vida e Abas ---

  ionViewWillLeave(): void {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }

  ionViewDidEnter(): void {
    if (this.aba === 'local' && !this.mapLoaded) {
      setTimeout(() => this.inicializarMapa(), 350);
    }
    if (this.aba === 'foto') {
      this.carregarFotosDoCache();
    }
  }

  alterarAba(valor: string): void {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    this.aba = valor;
    if (valor === 'local') {
      setTimeout(() => this.inicializarMapa(), 300);
    } else if (valor === 'foto') {
      this.carregarFotosDoCache();
    }
  }

  // 📦 Métodos de Cache
  private async salvarFotosNoCache(): Promise<void> {
    if (!this.storageKey || !this.chamado?.status) return;

    const status = this.chamado.status.toLowerCase();

    if (status === 'aberto' || status === 'pendente' || status === 'prioridade' || status === 'instalacao') {
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(this.fotos));
        console.log('Fotos salvas no cache interno. Status:', status);
      } catch (error) {
        console.error('Erro ao salvar no localStorage:', error);
      }
    } else if (status === 'finalizado') {
      console.log('Chamado Finalizado. Iniciando UPLOAD para o servidor...');
      // Lógica de UPLOAD aqui
    }
  }

  private carregarFotosDoCache(): void {
    if (!this.storageKey) return;
    try {
      const fotosSalvas = localStorage.getItem(this.storageKey);
      if (fotosSalvas) {
        this.fotos = JSON.parse(fotosSalvas);
      } else {
        this.fotos = [];
      }
    } catch (error) {
      console.error('Erro ao carregar do localStorage:', error);
      this.fotos = [];
    }
  }

  // 🖼️ Ação única de Captura/Escolha
  async capturarOuEscolherFoto() {
    const alert = await this.alertController.create({
      header: 'Enviar Foto',
      message: 'Escolha a fonte da imagem para o chamado:',
      buttons: [
        {
          text: 'Câmera 📷',
          handler: () => {
            this.processarFoto(CameraSource.Camera);
          },
        },
        {
          text: 'Galeria 🖼️',
          handler: () => {
            this.processarFoto(CameraSource.Photos);
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
    });

    await alert.present();
  }

  private async processarFoto(source: CameraSource) {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    const loading = await this.loadingController.create({
      message: 'Processando e salvando foto...',
    });
    await loading.present();

    try {
      const foto = await Camera.getPhoto({
        quality: 80,
        resultType: CameraResultType.DataUrl,
        source: source,
      });

      if (foto.dataUrl) {
        // Usa o spread operator para nova referência
        this.fotos = [...this.fotos, foto.dataUrl];
        await this.salvarFotosNoCache();

        // NOVO: Força o Angular a detectar a mudança na variável this.fotos imediatamente
        this.cd.detectChanges();
      }
    } catch (err) {
      console.error('Erro ao processar foto:', err);
    } finally {
      await loading.dismiss();
    }
  }

  // 👁️ Ação ao clicar na miniatura (Abre ActionSheet com as 3 opções)
  async acaoMiniatura(dataUrl: string, index: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opções da Foto',
      buttons: [
        {
          text: 'Excluir Foto',
          role: 'destructive',
          icon: 'trash-outline',
          handler: () => {
            this.confirmarExclusao(index);
          },
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  // ❌ Alerta de Confirmação de Exclusão
  async confirmarExclusao(index: number) {
    const alert = await this.alertController.create({
      header: 'Confirmação de Exclusão',
      message: 'Tem certeza que deseja excluir esta foto do chamado? Esta ação é irreversível.',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
        },
        {
          text: 'Sim, Excluir',
          handler: () => {
            this.removerFoto(index);
          },
        }
      ]
    });
    await alert.present();
  }

  // ❌ Remover Foto (Chamado por confirmarExclusao)
  async removerFoto(index: number) {
    this.fotos.splice(index, 1);
    await this.salvarFotosNoCache();

    // NOVO: Força a atualização da view após a remoção da foto do array
    this.cd.detectChanges();
  }

  // 🗑️ Método para limpar o cache 
  async limparCacheFotos() {
    if (!this.storageKey) return;
    localStorage.removeItem(this.storageKey);
    this.fotos = [];
    console.log('Cache de fotos limpo.');
  }

  // --- Métodos de Mapa e Comunicação (inalterados) ---

  inicializarMapa(): void {
    const mapDiv = document.getElementById('map');
    if (!mapDiv) return;

    if (this.map) this.map.remove();

    const latOS = this.chamado?.lat ? Number(this.chamado.lat) : -21.124466;
    const lngOS = this.chamado?.lng ? Number(this.chamado.lng) : -42.942535;

    this.map = L.map(mapDiv, { zoomControl: false }).setView([latOS, lngOS], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    const iconOS = L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/69/69524.png',
      iconSize: [38, 38],
      iconAnchor: [19, 38]
    });

    L.marker([latOS, lngOS], { icon: iconOS }).addTo(this.map).bindPopup("Local do chamado");

    navigator.geolocation.getCurrentPosition((pos) => {
      const latTec = pos.coords.latitude;
      const lngTec = pos.coords.longitude;

      const iconTec = L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
        iconSize: [35, 35],
        iconAnchor: [17, 35]
      });

      L.marker([latTec, lngTec], { icon: iconTec }).addTo(this.map).bindPopup("Minha localização");

      const bounds = L.latLngBounds([latOS, lngOS], [latTec, lngTec]);
      this.map.fitBounds(bounds, { padding: [40, 40] });
    }, () => {
      this.map.setView([latOS, lngOS], 16);
    });

    setTimeout(() => this.map.invalidateSize(), 300);
  }

  voltar(): void { this.router.navigate(['/home-list-os']); }
  ligar(numero: string): void { window.open(`tel:${numero}`, '_system'); }
  abrirWhatsApp(numero: string): void {
    const celular = numero.replace(/\D/g, '');
    const msg = encodeURIComponent("Olá! Estou entrando em contato sobre seu chamado.");
    window.open(`https://wa.me/${celular}?text=${msg}`, '_system');
  }
  copiarTexto(valor: string): void { navigator.clipboard.writeText(valor); }
  abrirMapaExterno(): void {
    if (!this.chamado?.lat || !this.chamado?.lng) return;
    const lat = this.chamado.lat;
    const lng = this.chamado.lng;
    const urlGoogleMaps = `https://www.google.com/maps/search/?api=1&query=$${lat},${lng}`;
    window.open(urlGoogleMaps, '_system');
  }
}