import { IVideoGame } from './videogame';

export interface IPagination {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: IVideoGame[];
}
