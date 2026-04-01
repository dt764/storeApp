import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonList, IonItem, IonThumbnail, IonLabel
} from '@ionic/angular/standalone';

import { ProductService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-public-products',
  templateUrl: './public-products.page.html',
  styleUrls: ['./public-products.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule,
    FormsModule, IonList, IonItem, IonThumbnail, IonLabel
  ]
})
export class PublicProductsPage {
  public productService = inject(ProductService);
}
