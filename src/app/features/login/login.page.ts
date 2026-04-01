import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormsModule, ReactiveFormsModule,
  FormGroup, FormControl, Validators
} from '@angular/forms';

import { IonicModule, ToastController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterLink]
})
export class LoginPage {
  private authService = inject(AuthService);
  private toastController = inject(ToastController);
  private loadingController = inject(LoadingController);
  private router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor() { }

  async login() {

    if (this.loginForm.invalid) {
      this.showErrorMessage('Por favor, completa los campos correctamente.');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
      spinner: 'crescent',
      duration: 2000
    });

    await loading.present();
    const { email, password } = this.loginForm.value;

    try {
      await this.authService.login(email!, password!);
      this.showInfoMessage('Inicio de sesión realizado. Redirigiendo...');
      setTimeout(() => {
        this.router.navigate(["/products"]);
      }, 2000);
    } catch (error: any) {
      let message = 'Error desconocido';

      console.error('Login error:', error);

      if (error.code === 'auth/user-not-found') {
        message = 'El usuario no existe';
      } else if (error.code === 'auth/wrong-password') {
        message = 'Contraseña incorrecta';
      } else if (error.code === 'auth/invalid-credential') {
        message = 'Credenciales inválidas';
      }

      this.showErrorMessage(message);
    } finally {
        loading.dismiss();
    }
  }

  async showErrorMessage(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      color: 'danger'
    });
    toast.present();
  }
  
  async showInfoMessage(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    toast.present();
  }
}