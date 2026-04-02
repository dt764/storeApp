import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, LoadingController, ViewWillEnter } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ProductService } from '../../core/services/products.service';
import { add, logOutOutline} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Product } from 'src/app/core/models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  imports: [IonicModule, CommonModule, RouterLink]
})
export class ProductsPage  {

  public productService = inject(ProductService);
  private authService = inject(AuthService);
  private router = inject(Router);
  products: Product[] = [];

  constructor() {
    addIcons({ add, logOutOutline });
  }

  goToAddProduct() {
    this.router.navigate(['/add-product']);
  }
  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;

    // Si ya es el placeholder, no hacer nada (evita bucle/parpadeo)
    if (img.src.includes('no-image.jpg')) return;

    img.src = 'assets/no-image.jpg';
  }
}
