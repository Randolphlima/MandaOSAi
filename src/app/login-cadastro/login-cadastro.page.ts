import { Component, OnInit, signal, computed, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NavController,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonInput,
  IonInputOtp,
  IonButton,
  IonIcon,
  IonText,
  IonProgressBar,
  IonItem,
  IonButtons
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';

// Importa os SVGs das Ionicons que são usados no template
import {
  arrowBack,
  keyOutline,
  businessOutline,
  checkmarkCircleOutline, arrowBackOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-login-cadastro',
  templateUrl: './login-cadastro.page.html',
  styleUrls: ['./login-cadastro.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonInput,
    IonInputOtp,
    IonButton,
    IonIcon,
    IonText,
    IonProgressBar,
    IonItem,
    IonButtons
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginCadastroPage implements OnInit {

  private navCtrl = inject(NavController);

  // Variáveis de Estado (Signals)
  currentStep = signal<1 | 2 | 3>(1);
  errorMessage = signal<string>('');

  // Variáveis de Input (Agora todas são Signals)
  companyCode = signal<string>(''); // <-- CORREÇÃO: Transformado em Signal
  userCode = signal<string>('');
  password = signal<string>('');

  // Constantes de Validação Estática
  private readonly VALID_COMPANY_CODE = '123';
  private readonly VALID_USER_CODE = '7777';
  private readonly VALID_PASSWORD = '142533';

  // Propriedade computada para a barra de progresso
  progress = computed(() => this.currentStep() / 3);

  // Propriedade computada para habilitar o botão PRÓXIMO/FINALIZAR
  isNextButtonEnabled = computed(() => {
    const step = this.currentStep();
    if (step === 1) {
      return this.companyCode().length === 3; // <-- CORREÇÃO: Usando this.companyCode()
    }
    if (step === 2) {
      return this.userCode().length === 4;
    }
    if (step === 3) {
      return this.password().length === 6;
    }
    return false;
  });

  constructor() {
    // REGISTRO DOS ÍCONES
    addIcons({ arrowBack, businessOutline, keyOutline, checkmarkCircleOutline, arrowBackOutline });
  }

  ngOnInit() { }

  /**
   * Trata a entrada do IonInput para o código da empresa.
   * @param event O evento de input do IonInput.
   */
  handleCompanyCodeInput(event: any) { // <-- CORREÇÃO: Nova função criada
    const value = event.target.value || '';
    // Limita o valor a 3 dígitos (embora o template já faça isso)
    const sanitizedValue = value.slice(0, 3);
    this.companyCode.set(sanitizedValue);
  }

  /**
   * Trata a entrada do IonInputOtp e atualiza o signal correspondente.
   */
  handleOtpInput(event: any, field: 'user' | 'password') {
    const value = event.target.value || '';
    if (field === 'user') {
      this.userCode.set(value);
    } else {
      this.password.set(value);
    }
  }

  /**
   * Valida a entrada da etapa atual e avança para a próxima ou finaliza.
   */
  nextStep() {
    this.errorMessage.set('');

    const currentStep = this.currentStep();

    if (currentStep === 1) {
      // CORREÇÃO: Usando this.companyCode() para obter o valor
      if (this.companyCode() === this.VALID_COMPANY_CODE) {
        this.currentStep.set(2);
      } else {
        this.errorMessage.set('Código da empresa incorreto. Tente "123".');
      }
    } else if (currentStep === 2) {
      if (this.userCode() === this.VALID_USER_CODE) {
        this.currentStep.set(3);
      } else {
        this.errorMessage.set('Código do usuário incorreto. Tente "7777".');
        this.userCode.set('');
      }
    } else if (currentStep === 3) {
      if (this.password() === this.VALID_PASSWORD) {
        this.finalLogin();
      } else {
        this.errorMessage.set('Senha incorreta. Tente "142533".');
        this.password.set('');
      }
    }
  }

  /**
   * Volta para a etapa anterior do wizard.
   */
  prevStep() {
    this.errorMessage.set('');
    const current = this.currentStep();
    if (current > 1) {
      this.currentStep.set((current - 1) as 1 | 2);
    }
  }

  /**
   * Função final de login (simulação de sucesso).
   */
  finalLogin() {
    console.log('Login bem-sucedido! Redirecionando para /home.');
    this.navCtrl.navigateRoot('/home');
  }

  goBack() {
    // Esta função será executada ao clicar no novo botão
    this.navCtrl.back();
  }
}