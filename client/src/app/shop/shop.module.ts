import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import { ProductItemComponent } from './product-item/product-item.component';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';


import {MatBadgeModule} from '@angular/material/badge'; 

@NgModule({
  declarations: [ShopComponent, ProductItemComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatSelectModule,
    MatIconModule,
    SharedModule,
    MatInputModule
  ],
  exports: [
    ShopComponent
  ]
})
export class ShopModule { }
