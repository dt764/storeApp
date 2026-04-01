import { Injectable, inject } from '@angular/core';

import {
  Firestore, collection,
  collectionData, query, where, addDoc,
  doc,
  deleteDoc
} from'@angular/fire/firestore';

import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from './auth.service';
import { Product } from '../models/product.model';
import { switchMap, of, Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class ProductService {

  private firestore = inject(Firestore);
  private authService = inject(AuthService);
  private productsCollection = collection(this.firestore, 'products');


  private products$ = this.authService.user$.pipe(
    switchMap(user => {
      if (user) {
        const q = query(this.productsCollection, where('userId', '==', user.uid));
        return collectionData(q, { idField: 'id' }) as Observable<Product[]>;
      } else {
        return of([]);
      }
    })
  );

  public products = toSignal(this.products$, { initialValue: [] });

  private allProductsCollection = collection(this.firestore, 'products');
  private allProducts$: Observable<Product[]> = collectionData(this.allProductsCollection, { idField: 'id' }) as Observable<Product[]>;
  public allProducts = toSignal(this.allProducts$, { initialValue: [] });
  
  async addProduct(product: Product) {
    const uid = this.authService.getUID();
    if (!uid) throw new Error('No hay usuario autenticado');
    return addDoc(this.productsCollection, {
      ...product,
      userId: uid
    });
  }

  getProductById(id: string): Product | undefined {
    // products es un signal
    return this.products().find(p => p.id === id);
  }

  async deleteProduct(id: string) {
    try {
      const docRef = doc(this.firestore, `products/${id}`);
      await deleteDoc(docRef);
      console.log(`Producto ${id} eliminado correctamente.`);
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      throw error;
    }
  }
}