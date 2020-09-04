import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [ShopComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  exports: [
    ShopComponent
  ]
})
export class ShopModule { }
