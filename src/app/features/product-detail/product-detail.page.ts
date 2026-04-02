import { Component, computed, inject, Input } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonCard, IonButton, IonButtons, IonBackButton
} from '@ionic/angular/standalone';

import { ProductService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonCard,
    IonButton, IonButtons, IonBackButton
]
})
export class ProductDetailPage {

  public productService = inject(ProductService);
  private alertController = inject(AlertController);
  private toastController = inject(ToastController);
  private router = inject(Router);

  @Input() id?: string;
  public product = computed(() => {
    if (!this.id) return undefined;
    return this.productService.products().find(p => p.id === this.id);
  });

  async deleteProduct(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Seguro que quieres borrar este producto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            try {
              await this.productService.deleteProduct(id);

              // Mostrar toast de éxito
              const toast = await this.toastController.create({
                message: 'Producto eliminado correctamente.',
                duration: 2000,
                color: 'success'
              });
              toast.present();

              // Volver a la lista si estamos en detalle
              this.router.navigate(['/products']);
            } catch (error) {
              const toast = await this.toastController.create({
                message: 'Error al eliminar el producto.',
                duration: 2000,
                color: 'danger'
              });
              toast.present();
            }
          }
        }
      ]
    });

    await alert.present();
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;

    // Si ya es el placeholder, no hacer nada (evita bucle/parpadeo)
    if (img.src.includes('no-image.jpg')) return;

    img.src = 'assets/no-image.jpg';
  }

}
