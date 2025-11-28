import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonButton, IonMenuButton, IonIcon
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-list-map',
  templateUrl: './home-list-map.page.html',
  styleUrls: ['./home-list-map.page.scss'],
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
    RouterModule
  ]
})
export class HomeListMapPage implements AfterViewInit {

  private map!: L.Map;
  private markersLayer!: L.LayerGroup;

  carregando = false;

  chamados = [
    { nome: "Cliente 1", status: "Aberto", endereco: "Voluntários da Pátria", lat: -21.7621, lng: -41.3189 },
    { nome: "Cliente 2", status: "Pendente", endereco: "Av Pelinca", lat: -21.7521, lng: -41.3300 },
    { nome: "Cliente 3", status: "Em andamento", endereco: "Rua Formosa", lat: -21.7478, lng: -41.3260 },
    { nome: "Cliente 4", status: "Aberto", endereco: "Parque Rosário", lat: -21.7445, lng: -41.3144 },
    { nome: "Cliente 5", status: "Fechado", endereco: "Guarus", lat: -21.7400, lng: -41.3050 },
    { nome: "Cliente 6", status: "Aberto", endereco: "IPS", lat: -21.7625, lng: -41.3310 }
  ];

  ngAfterViewInit() {
    setTimeout(() => {
      this.initMap();
    }, 300);
  }

  private initMap() {
    this.map = L.map('map', { zoomControl: true })
      .setView([-21.7621, -41.3189], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(this.map);

    this.markersLayer = L.layerGroup().addTo(this.map);

    setTimeout(() => {
      this.map.invalidateSize();
    }, 300);

    this.localizarUsuario();
    this.renderizarChamados();
  }

  private localizarUsuario() {
    const userIcon = L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/535/535239.png',
      iconSize: [40, 40],
      iconAnchor: [20, 40]
    });

    this.map.locate({ watch: false, setView: true, maxZoom: 18 });

    this.map.on('locationfound', (e: any) => {
      L.marker(e.latlng, { icon: userIcon })
        .addTo(this.map)
        .bindPopup("Você está aqui")
        .openPopup();

      this.map.setView(e.latlng, 16, { animate: true });
    });

    this.map.on('locationerror', () => {
      console.warn("GPS não disponível.");
    });
  }

  // ------------------------------------------------------
  // 🔹 FUNÇÃO QUE RE-ADICIONA OS MARCADORES (background)
  // ------------------------------------------------------
  private renderizarChamados() {
    const chamadoIcon = L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
      iconSize: [38, 38],
      iconAnchor: [19, 38]
    });

    // limpa marcadores antigos
    this.markersLayer.clearLayers();

    // exibe em background
    setTimeout(() => {
      this.chamados.forEach(ch => {
        L.marker([ch.lat, ch.lng], { icon: chamadoIcon })
          .addTo(this.markersLayer)
          .bindPopup(
            `<b>${ch.nome}</b><br>Status: ${ch.status}<br>Endereço: ${ch.endereco}`
          );
      });
    }, 50);
  }

  // ------------------------------------------------------
  // 🔹 ATUALIZAR EM SEGUNDO PLANO (sem recarregar o mapa)
  // ------------------------------------------------------
  atualizarChamados() {
    this.carregando = true;

    // Simula buscar do backend – aqui você vai colocar sua API
    setTimeout(() => {

      // exemplo: atualizando lista com novos chamados
      this.chamados.push({
        nome: "Novo Cliente",
        status: "Aberto",
        endereco: "Centro",
        lat: -21.7600,
        lng: -41.3200
      });

      // atualiza só os marcadores
      this.renderizarChamados();

      this.carregando = false;

    }, 1500); // simula resposta demorada sem travar tela
  }
}
