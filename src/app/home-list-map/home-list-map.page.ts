import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home-list-map',
  templateUrl: './home-list-map.page.html',
  styleUrls: ['./home-list-map.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HomeListMapPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
