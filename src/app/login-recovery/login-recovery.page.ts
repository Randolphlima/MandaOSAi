import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular'; // Importar ToastController
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonInput,
  IonBackButton,
  IonItem,
  IonLabel
} from '@ionic/angular/standalone';

// Importação dos ícones
import { addIcons } from 'ionicons';
import { arrowBack } from 'ionicons/icons';

addIcons({ arrowBack });

@Component({
  selector: 'app-login-recovery',
  templateUrl: './login-recovery.page.html',
  styleUrls: ['./login-recovery.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonInput,
    FormsModule,
    CommonModule,
    IonBackButton,
    IonItem, // Necessário para a correta formatação de inputs no Ionic
    IonLabel
  ]
})

export class LoginRecoveryPage implements OnInit {

  // Modelos de dados conectados ao HTML via [(ngModel)]
  codigoUsuario: string = '';
  celular: string = '';

  // Dados fixos para simulação de validação
  private readonly CODIGO_CORRETO = '1234';
  private readonly CELULAR_CORRETO = '987654321'; // Celular sem formatação (apenas números)

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController // Injetar ToastController para mensagens
  ) { }

  ngOnInit() {
  }

  /**
   * Função chamada ao clicar no botão "Enviar Link de Recuperação".
   * Realiza a validação e, em caso de sucesso, navega para a página inicial.
   */
  async recoverPassword() {
    // Limpar o celular (remover parênteses, traços, espaços, etc.) para comparar com o dado fixo
    const celularLimpo = this.celular ? this.celular.replace(/\D/g, '') : '';

    if (this.codigoUsuario === this.CODIGO_CORRETO && celularLimpo === this.CELULAR_CORRETO) {
      // 1. Sucesso: Mostrar Toast (substituto do alert())
      await this.presentToast('O link para recuperar a senha foi enviado por SMS para o seu celular. ✅', 'success');

      // 2. Navegar de volta para a tela de login
      // Usamos navigateRoot para ir para a Home-Login e limpar o histórico de navegação
      this.navCtrl.navigateRoot('/login-home');
    } else {
      // Falha: Mostrar Toast de erro
      await this.presentToast('Dados incorretos. Verifique seu código de usuário e número de celular.', 'danger');
    }
  }

  /**
   * Exibe uma mensagem Toast (Snackbar) no rodapé da tela.
   * @param message A mensagem a ser exibida.
   * @param color A cor do toast (e.g., 'success', 'danger', 'light').
   */
  async presentToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 8000,
      position: 'bottom',
      color: color,
    });
    await toast.present();
  }

}