import { ShopService } from './shop.service';
import { IVideoGame } from '../shared/models/videogame';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  videoGames: IVideoGame[];

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.shopService.getProducts().subscribe(response => {
      this.videoGames = response.data;
    });
  }

}
