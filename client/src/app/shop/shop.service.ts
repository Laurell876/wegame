import { ShopParams } from './../shared/models/shopParams';
import { IPublisher } from './../shared/models/publisher';
import { IDeveloper } from './../shared/models/developer';
import { IPagination } from '../Shared/Models/pagination';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  getVideoGames(shopParams: ShopParams): Observable<IPagination> {
    let params = new HttpParams();

    if (shopParams.developerId !== 0 )
    {
      params = params.append('developerId', shopParams.developerId.toString());
    }

    if (shopParams.publisherId !== 0 )
    {
      params = params.append('publisherId', shopParams.publisherId.toString());
    }

    if (shopParams.search) {
      params = params.append('search', shopParams.search);
    }

    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageIndex.toString());
    params = params.append('pageSize', shopParams.pageSize.toString());

    return this.http.get<IPagination>(this.baseUrl + 'videogames', { observe : 'response', params })
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }

  getDevelopers(): Observable<IDeveloper[]> {
    return this.http.get<IDeveloper[]>(this.baseUrl + 'videogames/developers');
  }

  getPublishers(): Observable<IPublisher[]> {
    return this.http.get<IPublisher[]>(this.baseUrl + 'videogames/publishers');
  }


}
