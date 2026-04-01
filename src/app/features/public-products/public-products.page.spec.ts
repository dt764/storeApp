import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicProductsPage } from './public-products.page';

describe('PublicProductsPage', () => {
  let component: PublicProductsPage;
  let fixture: ComponentFixture<PublicProductsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
