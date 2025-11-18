import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { SideMenuComponent } from './side-menu/side-menu.component';

// ícones
import { addIcons } from 'ionicons';
import {
  homeOutline,
  constructOutline,
  mapOutline,
  settingsOutline,
  logOutOutline,
  menuOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    SideMenuComponent
  ],
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor() {
    addIcons({
      homeOutline,
      constructOutline,
      mapOutline,
      settingsOutline,
      logOutOutline,
      menuOutline
    });
  }
}
