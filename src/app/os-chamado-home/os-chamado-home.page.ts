import { Component } from '@angular/core';
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
  IonCol
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
    IonCol
  ],
})
export class OsChamadoHomePage implements ViewDidEnter {

  chamado: any;
  aba = "dados";

  fotos: string[] = []; // array de fotos

  private map!: L.Map;
  private mapLoaded = false;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.chamado = nav?.extras.state?.['chamado'];
  }

  ionViewWillLeave(): void {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }

  ionViewDidEnter(): void {
    console.log("ionViewDidEnter disparou!");
    if (this.aba === "local" && !this.mapLoaded) {
      setTimeout(() => this.inicializarMapa(), 350);
    }
  }

  alterarAba(valor: string): void {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    this.aba = valor;
    if (valor === 'local') {
      setTimeout(() => this.inicializarMapa(), 300);
    }
  }

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

  // 📞 e WhatsApp
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
    const urlGoogleMaps = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(urlGoogleMaps, '_system');
  }

  // 📸 Fotos
  async tirarFotoMobile() {
    if (Capacitor.getPlatform() === 'web') return; // ignora no navegador
    try {
      const foto = await Camera.getPhoto({
        quality: 80,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });
      if (foto.dataUrl) this.fotos.push(foto.dataUrl);
    } catch (err) { console.error('Erro ao tirar foto:', err); }
  }

  async escolherFotoMobile() {
    if (Capacitor.getPlatform() === 'web') return; // ignora no navegador
    try {
      const foto = await Camera.getPhoto({
        quality: 80,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos
      });
      if (foto.dataUrl) this.fotos.push(foto.dataUrl);
    } catch (err) { console.error('Erro ao escolher foto:', err); }
  }

  // 📁 Fallback navegador
  onFileSelected(event: any) {
    const arquivos = event.target.files;
    if (!arquivos) return;

    for (let i = 0; i < arquivos.length; i++) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.fotos.push(e.target.result);
      };
      reader.readAsDataURL(arquivos[i]);
    }
  }

}
