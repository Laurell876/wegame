import { IPagination } from './Models/pagination';
import { IVideoGame } from './Models/videogame';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wegame';

  videoGames: IVideoGame[];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('https://localhost:5001/api/videogames?pagesize=50').subscribe((response: IPagination) => {
      this.videoGames = response.data;
    }, error => {
      console.log(error);
    });
  }

}
