import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonContent, IonHeader, IonTitle, IonToolbar, IonList,
  IonItem, IonThumbnail, IonLabel, IonButtons, IonBackButton
} from '@ionic/angular/standalone';

import { ProductService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-public-products',
  templateUrl: './public-products.page.html',
  styleUrls: ['./public-products.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule,
    FormsModule, IonList, IonItem, IonThumbnail, IonLabel,
    IonButtons,
    IonBackButton
]
})
export class PublicProductsPage {
  public productService = inject(ProductService);

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;

    // Si ya es el placeholder, no hacer nada (evita bucle/parpadeo)
    if (img.src.includes('no-image.jpg')) return;

    img.src = 'assets/no-image.jpg';
  }
}
