import { SharedModule } from './../shared/shared.module';
import { BasketRoutingModule } from './basket-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [BasketComponent],
  imports: [
    BasketRoutingModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    SharedModule
  ]
})
export class BasketModule { }
