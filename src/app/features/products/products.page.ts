import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, LoadingController, ViewWillEnter } from '@ionic/angular';
import { Router } from '@angular/router';
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
  imports: [IonicModule, CommonModule]
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
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
