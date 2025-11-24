import { Component, ChangeDetectorRef } from '@angular/core';
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

  // --- Assinatura Digital ---
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D | null;
  private desenhando = false;

  assinaturaKey = '';
  assinaturaBase64: string | null = null;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private actionSheetController: ActionSheetController,
    private cd: ChangeDetectorRef
  ) {
    const nav = this.router.getCurrentNavigation();
    this.chamado = nav?.extras.state?.['chamado'];

    if (this.chamado?.id) {
      this.storageKey = `fotos_chamado_${this.chamado.id}`;
      this.assinaturaKey = `assinatura_chamado_${this.chamado.id}`;
    }

    this.carregarFotosDoCache();
    this.carregarAssinaturaDoCache();
  }

  // --- Ciclo de Vida ---
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
    if (this.aba === 'assinatura') {
      setTimeout(() => this.inicializarCanvasAssinatura(), 200);
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
    } else if (valor === 'assinatura') {
      setTimeout(() => this.inicializarCanvasAssinatura(), 200);
    }
  }

  // ───────────────────────────────────────────────
  //  📦 CACHE FOTOS
  // ───────────────────────────────────────────────

  private async salvarFotosNoCache(): Promise<void> {
    if (!this.storageKey || !this.chamado?.status) return;

    const status = this.chamado.status.toLowerCase();

    if (['aberto', 'pendente', 'prioridade', 'instalacao'].includes(status)) {
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(this.fotos));
        console.log('Fotos salvas no cache interno.');
      } catch (error) {
        console.error('Erro ao salvar no localStorage:', error);
      }
    } else if (status === 'finalizado') {
      console.log('Chamado Finalizado. UPLOAD...');
    }
  }

  private carregarFotosDoCache(): void {
    if (!this.storageKey) return;
    try {
      const fotosSalvas = localStorage.getItem(this.storageKey);
      this.fotos = fotosSalvas ? JSON.parse(fotosSalvas) : [];
    } catch {
      this.fotos = [];
    }
  }

  // 🖼️ Foto: Captura ou Galeria
  async capturarOuEscolherFoto() {
    const alert = await this.alertController.create({
      header: 'Enviar Foto',
      message: 'Escolha a fonte:',
      buttons: [
        { text: 'Câmera 📷', handler: () => this.processarFoto(CameraSource.Camera) },
        { text: 'Galeria 🖼️', handler: () => this.processarFoto(CameraSource.Photos) },
        { text: 'Cancelar', role: 'cancel' },
      ],
    });
    await alert.present();
  }

  private async processarFoto(source: CameraSource) {
    const loading = await this.loadingController.create({
      message: 'Processando...',
    });
    await loading.present();

    try {
      const foto = await Camera.getPhoto({
        quality: 80,
        resultType: CameraResultType.DataUrl,
        source: source,
      });

      if (foto.dataUrl) {
        this.fotos = [...this.fotos, foto.dataUrl];
        await this.salvarFotosNoCache();
        this.cd.detectChanges();
      }
    } catch (err) {
      console.error('Erro ao processar foto:', err);
    } finally {
      await loading.dismiss();
    }
  }

  // 🗑️ Remover Foto
  async acaoMiniatura(dataUrl: string, index: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opções da Foto',
      buttons: [
        {
          text: 'Excluir Foto',
          role: 'destructive',
          icon: 'trash-outline',
          handler: () => this.confirmarExclusao(index),
        },
        { text: 'Cancelar', icon: 'close', role: 'cancel' }
      ],
    });
    await actionSheet.present();
  }

  async confirmarExclusao(index: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar Exclusão',
      message: 'Deseja excluir esta foto?',
      buttons: [
        { text: 'Não', role: 'cancel' },
        { text: 'Sim', handler: () => this.removerFoto(index) }
      ]
    });
    await alert.present();
  }

  async removerFoto(index: number) {
    this.fotos.splice(index, 1);
    await this.salvarFotosNoCache();
    this.cd.detectChanges();
  }

  // ───────────────────────────────────────────────
  //  ✍️ ASSINATURA DIGITAL
  // ───────────────────────────────────────────────

  inicializarCanvasAssinatura() {
    this.canvas = document.getElementById('canvasAssinatura') as HTMLCanvasElement;
    if (!this.canvas) return;

    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;

    this.ctx = this.canvas.getContext('2d');

    // Recarregar assinatura existente
    if (this.assinaturaBase64) {
      const img = new Image();
      img.onload = () => this.ctx?.drawImage(img, 0, 0);
      img.src = this.assinaturaBase64;
    }

    // Eventos Touch
    this.canvas.addEventListener('touchstart', (e) => this.iniciarDesenho(e));
    this.canvas.addEventListener('touchmove', (e) => this.desenhar(e));
    this.canvas.addEventListener('touchend', () => this.pararDesenho());

    // Eventos Mouse
    this.canvas.addEventListener('mousedown', (e) => this.iniciarDesenho(e));
    this.canvas.addEventListener('mousemove', (e) => this.desenhar(e));
    this.canvas.addEventListener('mouseup', () => this.pararDesenho());
    this.canvas.addEventListener('mouseleave', () => this.pararDesenho());
  }

  iniciarDesenho(event: any) {
    this.desenhando = true;
    this.ctx!.beginPath();

    this.ctx!.moveTo(
      event.offsetX ?? event.touches[0].clientX - this.canvas.getBoundingClientRect().left,
      event.offsetY ?? event.touches[0].clientY - this.canvas.getBoundingClientRect().top
    );
  }

  desenhar(event: any) {
    if (!this.desenhando) return;
    event.preventDefault();

    const x = event.offsetX ?? event.touches[0].clientX - this.canvas.getBoundingClientRect().left;
    const y = event.offsetY ?? event.touches[0].clientY - this.canvas.getBoundingClientRect().top;

    this.ctx!.lineWidth = 2;
    this.ctx!.lineCap = 'round';
    this.ctx!.strokeStyle = '#000';

    this.ctx!.lineTo(x, y);
    this.ctx!.stroke();
  }

  pararDesenho() {
    this.desenhando = false;
  }

  limparAssinatura() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.assinaturaBase64 = null;
    localStorage.removeItem(this.assinaturaKey);
  }

  salvarAssinatura() {
    if (!this.canvas) return;

    const base64 = this.canvas.toDataURL('image/png');
    this.assinaturaBase64 = base64;

    const status = this.chamado?.status?.toLowerCase();

    if (status === 'finalizado') {
      console.log('Chamado finalizado → enviar pro servidor.');
      return;
    }

    localStorage.setItem(this.assinaturaKey, base64);
    console.log('Assinatura salva no cache.');
  }

  carregarAssinaturaDoCache() {
    const data = localStorage.getItem(this.assinaturaKey);
    if (data) {
      this.assinaturaBase64 = data;
    }
  }

  // ───────────────────────────────────────────────
  //  MAPA / AÇÕES / CONTATOS
  // ───────────────────────────────────────────────

  inicializarMapa(): void {
    const mapDiv = document.getElementById('map');
    if (!mapDiv) return;

    if (this.map) this.map.remove();

    const latOS = this.chamado?.lat ? Number(this.chamado.lat) : -21.77762190782075;
    const lngOS = this.chamado?.lng ? Number(this.chamado.lng) : -41.3119221;

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

  // Ações extras
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
    window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_system');
  }
}
