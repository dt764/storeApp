import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import {
  IonicModule,
  ToastController,
  LoadingController
} from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.page.html',
  styleUrl: './register.page.scss',
  imports: [IonicModule, CommonModule, ReactiveFormsModule, RouterLink],
})
export class RegisterPage {

  private authService = inject(AuthService);
  private toastController = inject(ToastController);
  private loadingController = inject(LoadingController);
  private router = inject(Router);

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  async register() {
    if (this.registerForm.invalid) {
      this.showToast('Completa los campos correctamente', 'danger');
      return;
    }

    const { email, password, confirmPassword } = this.registerForm.value;

    if (password !== confirmPassword) {
      this.showToast('Las contraseñas no coinciden', 'danger');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Registrando usuario...'
    });

    await loading.present();

    try {
      await this.authService.register(email!, password!);

      this.showToast('Usuario creado correctamente');

      // Redirigir directamente a productos o login
      this.router.navigate(['/products']);

    } catch (error: any) {
      this.handleError(error);
    } finally {
      loading.dismiss();
    }
  }

  async handleError(error: any) {
    let message = 'Error en el registro';

    if (error.code === 'auth/email-already-in-use') {
      message = 'El correo ya está registrado';
    } else if (error.code === 'auth/invalid-email') {
      message = 'Correo inválido';
    } else if (error.code === 'auth/weak-password') {
      message = 'La contraseña es demasiado débil';
    }

    this.showToast(message, 'danger');
  }

  async showToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'bottom'
    });
    toast.present();
  }
}