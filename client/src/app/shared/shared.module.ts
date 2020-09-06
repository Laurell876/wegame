import { OrderTotalsComponent } from './components/order-totals/order-totals.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PagerComponent } from './components/pager/pager.component';
import {MatPaginatorModule} from '@angular/material/paginator';



@NgModule({
  declarations: [PagerComponent, OrderTotalsComponent],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    MatPaginatorModule,
    CarouselModule.forRoot()
  ],
  exports: [
    PaginationModule,
    PagerComponent,
    CarouselModule,
    OrderTotalsComponent
  ]
})
export class SharedModule { }
