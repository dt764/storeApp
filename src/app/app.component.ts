import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  publicRoutes = ['/login', '/register', '/home', '/public-products'];
  constructor() {}

  ngOnInit(){
    this.authService.user$.subscribe(user => {
      const currentUrl = this.router.url;

      // Si no hay usuario y no estamos en ruta pública → redirigir
      if (!user && !this.publicRoutes.includes(currentUrl)) {
        this.router.navigateByUrl('/login', { replaceUrl: true });
      }
    });}
}
