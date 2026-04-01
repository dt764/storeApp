import { Injectable, inject } from '@angular/core';

import {
  Firestore, collection,
  collectionData, query, where, addDoc
} from'@angular/fire/firestore';

import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from './auth.service';
import { Product } from '../models/product.model';
import { switchMap, of, Observable } from 'rxjs';
import { createUserWithEmailAndPassword, Auth } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class ProductService {

  private firestore = inject(Firestore);
  private authService = inject(AuthService);
  private auth = inject(Auth);
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
  
  async addProduct(product: Product) {
    const uid = this.authService.getUID();
    if (!uid) throw new Error('No hay usuario autenticado');
    return addDoc(this.productsCollection, {
      ...product,
      userId: uid
    });
  }

  async register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }
}