import { IPublisher } from './../shared/models/publisher';
import { IDeveloper } from './../shared/models/developer';
import { ShopService } from './shop.service';
import { IVideoGame } from '../shared/models/videogame';
import { Component, OnInit } from '@angular/core';
import { ShopParams } from '../shared/models/shopParams'
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  videoGames: IVideoGame[];
  developers: IDeveloper[];
  publishers: IPublisher[];
  shopParams = new ShopParams();
  totalCount: number;
  sortingOptions = [
    {name: 'Alphabetical', value: 'title'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'},
    {name: 'Rating: Low to High', value: 'ratingAsc'},
    {name: 'Rating: High to Low', value: 'ratingDesc' },
    {name: 'Release Year: Latest Releases', value: 'releaseYearAsc'},
    {name: 'Release Year: Oldest Games', value: 'releaseYearDesc'}
  ];

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getVideoGames();
    this.getDevelopers();
    this.getPublishers();
  }


  getVideoGames(): void {
    this.shopService.getVideoGames(this.shopParams).subscribe(response => {
      this.videoGames = response.data;
      this.shopParams.pageIndex = response.pageIndex;
      this.shopParams.pageSize = response.pageSize;
      this.totalCount = response.count;
    }, error => {
      console.log(error);
    });
  }

  getDevelopers(): void {
    this.shopService.getDevelopers().subscribe(response => {
      this.developers = [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  getPublishers(): void {
    this.shopService.getPublishers().subscribe(response => {
      this.publishers = [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  onDeveloperSelected(developerId: number): void {
    this.shopParams.developerId = developerId;
    this.getVideoGames();
  }

  onPublisherSelected(publisherId: number): void {
    this.shopParams.publisherId = publisherId;
    this.getVideoGames();
  }

  onSortSelected(sort: string): void {
    this.shopParams.sort = sort;
    this.getVideoGames();
  }

  onPageChanged(event: PageEvent): void {
    this.shopParams.pageIndex = event.pageIndex + 1; // the event page index is zero indexed
    console.log(this.shopParams.pageIndex);
    this.getVideoGames();
  }
}
