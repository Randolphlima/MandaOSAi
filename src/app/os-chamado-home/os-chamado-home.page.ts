import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-os-chamado-home',
  templateUrl: './os-chamado-home.page.html',
  styleUrls: ['./os-chamado-home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class OsChamadoHomePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
