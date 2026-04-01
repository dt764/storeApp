import { Routes } from '@angular/router';
import { authGuard, redirectIfLoggedInGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    canActivate: [redirectIfLoggedInGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.page').then( m => m.LoginPage),
    canActivate: [redirectIfLoggedInGuard]
  },
  {
    path: 'products',
    loadComponent: () => import('./features/products/products.page').then( m => m.ProductsPage),
    canActivate: [authGuard],
  },
  {
    path: 'add-product',
    loadComponent: () => import('./features/add-product/add-product.page').then( m => m.AddProductPage),
    canActivate: [authGuard]
  },
  {
    path: 'public-products',
    loadComponent: () => import('./features/public-products/public-products.page').then( m => m.PublicProductsPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/register/register.page').then( m => m.RegisterPage),
    canActivate: [redirectIfLoggedInGuard]
  },

  {
    path: 'products/:id',
    loadComponent: () => import('./features/product-detail/product-detail.page').then( m => m.ProductDetailPage),
  }
];
