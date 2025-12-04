import {
  Component, OnInit,
  signal, computed, ChangeDetectionStrategy, inject
} from '@angular/core';

import { AlertController, NavController } from '@ionic/angular';

import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon,
  IonInputOtp, IonText, IonProgressBar, IonItem, IonInput, IonButtons
} from '@ionic/angular/standalone';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { addIcons } from 'ionicons';
import {
  arrowBack, businessOutline, keyOutline, checkmarkCircleOutline,
  arrowBackOutline, personOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-login-cadastro',
  templateUrl: './login-cadastro.page.html',
  styleUrls: ['./login-cadastro.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonButton, IonButtons, IonIcon, IonInputOtp, IonText,
    IonProgressBar, IonItem, IonInput
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginCadastroPage implements OnInit {

  private navCtrl = inject(NavController);
  private alertController = inject(AlertController);

  currentStep = signal<1 | 2 | 3>(1);
  errorMessage = signal('');

  userCode = signal('');
  companyCode = signal('');
  password = signal('');

  USERS = [
    { code: '7777', name: 'João da Silva Pereira', company: '123' },
    { code: '5555', name: 'Maria Oliveira de Souza', company: '999' }
  ];

  COMPANIES: Record<string, string> = {
    '123': 'Empresa Alpha Telecom',
    '999': 'Tech Solutions'
  };

  VALID_PASSWORD = '142533';

  progress = computed(() => this.currentStep() / 3);

  isNextButtonEnabled = computed(() => {
    if (this.currentStep() === 1) return this.userCode().length === 4;
    if (this.currentStep() === 2) return this.companyCode().length === 3;
    if (this.currentStep() === 3) return this.password().length === 6;
    return false;
  });

  constructor() {
    addIcons({
      arrowBack, businessOutline, keyOutline,
      checkmarkCircleOutline, arrowBackOutline, personOutline
    });
  }

  ngOnInit() { }

  async nextStep() {
    this.errorMessage.set('');
    const step = this.currentStep();

    // STEP 1 — VALIDAR USUÁRIO
    if (step === 1) {
      const found = this.USERS.find(u => u.code === this.userCode());

      if (!found) {
        this.errorMessage.set('Código de usuário não encontrado.');
        return;
      }

      const alert = await this.alertController.create({
        header: 'Confirmar Usuário',
        message: `Encontramos o usuário ${found.name}. Está correto?`, // texto provisório
        cssClass: 'html-alert',
        buttons: [
          { text: 'Não', role: 'cancel' },
          {
            text: 'Sim',
            handler: () => this.currentStep.set(2)
          }
        ]
      });

      await alert.present();

      // 🔥 CORRIGE O HTML NA MENSAGEM
      const el = document.querySelector('ion-alert.html-alert .alert-message');
      if (el) {
        el.innerHTML = `Encontramos o usuário: <strong>${found.name}</strong>. <br>Está correto?`;
      }

      return;
    }

    // STEP 2 — VALIDAR EMPRESA
    if (step === 2) {
      const user = this.USERS.find(u => u.code === this.userCode());

      if (!user || user.company !== this.companyCode()) {
        this.errorMessage.set('O usuário não pertence a esta empresa.');
        return;
      }

      const companyName = this.COMPANIES[this.companyCode()] ?? 'Empresa não localizada';

      const alert = await this.alertController.create({
        header: 'Confirmar Empresa',
        message: `Empresa localizada: ${companyName}. Confirmar?`, // texto provisório
        cssClass: 'html-alert',
        buttons: [
          { text: 'Não', role: 'cancel' },
          {
            text: 'Sim',
            handler: () => this.currentStep.set(3)
          }
        ]
      });

      await alert.present();

      // 🔥 CORRIGE O HTML NA MENSAGEM
      const el = document.querySelector('ion-alert.html-alert .alert-message');
      if (el) {
        el.innerHTML = `Empresa localizada: <strong>${companyName}</strong>. <BR>Confirmar?`;
      }

      return;
    }

    // STEP 3 — VALIDAR SENHA
    if (step === 3) {
      if (this.password() !== this.VALID_PASSWORD) {
        this.errorMessage.set('Senha incorreta.');
        return;
      }

      this.finalLogin();
    }
  }


  finalLogin() {
    this.navCtrl.navigateRoot('/home');
  }

  prevStep() {
    if (this.currentStep() > 1) {
      this.currentStep.set((this.currentStep() - 1) as 1 | 2 | 3);
    }
  }

  goBack() {
    this.navCtrl.back();
  }

  handleOtpInput(ev: any, field: 'user' | 'password') {
    const v = ev.target.value || '';
    if (field === 'user') this.userCode.set(v);
    if (field === 'password') this.password.set(v);
  }

  handleCompanyCodeInput(ev: any) {
    const v = ev.target.value || '';
    this.companyCode.set(v.slice(0, 3));
  }
}
