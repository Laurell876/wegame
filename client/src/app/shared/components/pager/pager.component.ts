import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit {

  @Input() totalCount: number;
  @Input() pageSize: number;
  @Output() pageChangedEmitter = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  pageHasChanged(event: PageEvent): void
  {
      // the event page index is zero indexed
      this.pageChangedEmitter.emit(event.pageIndex + 1);
  }

}
