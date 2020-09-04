import { IPagination } from './shared/models/pagination';
import { IVideoGame } from './shared/models/videogame';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

}
