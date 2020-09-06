import { BasketService } from './../../basket/basket.service';
import { Component, OnInit } from '@angular/core';
import { IVideoGame } from 'src/app/Shared/Models/videogame';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  videoGame: IVideoGame;
  quantity = 1;

  constructor(
    private shopService: ShopService,
    private activatedRoute: ActivatedRoute,
    private bcService: BreadcrumbService,
    private basketService: BasketService
  ) {
    this.bcService.set('@videoGameDetails', '');
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  addItemToBasket() {
    this.basketService.addItemToBasket(this.videoGame, this.quantity);
  }

  changeQuantity(increment: boolean): void {
    if (increment) {
      this.quantity++;
      return;
    }
    this.quantity--;
  }

  loadProduct(): void {
    this.shopService
      .getVideoGame(+this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe(
        (videoGame) => {
          this.videoGame = videoGame;
          this.bcService.set('@videoGameDetails', videoGame.title);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
