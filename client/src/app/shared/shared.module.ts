import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagerComponent } from './components/pager/pager.component';
import {MatPaginatorModule} from '@angular/material/paginator'; 


@NgModule({
  declarations: [PagerComponent],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    MatPaginatorModule

  ],
  exports: [
    PaginationModule,
    PagerComponent
  ]
})
export class SharedModule { }
