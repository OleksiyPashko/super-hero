import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ISuperHero, ISuperHeroEdition, ISuperHeroesHttpResponse } from '../../models/interfaces/super-hero.interface';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class SuperHeroHttpService {
    constructor(private readonly httpClient: HttpClient) {}
    public getHeroById(id: number): Observable<ISuperHero> {
        return this.httpClient.get<ISuperHero>(environment.httpServer + `/super-heroes/${id}`).pipe(
            catchError((error: HttpErrorResponse): Observable<never> => {
                return throwError(() => error);
            })
        );
    }

    public getHeroes(
        sort: string | undefined,
        order: string | undefined,
        page: number | undefined,
        itemsPerPage: number,
        name?: string,
        id?: string
    ): Observable<ISuperHeroesHttpResponse> {
        const nameQuery: string = name ? `name_like=${name.trim()}` : '';
        const idQuery: string = id ? `id=${id.trim()}` : '';

        return this.httpClient
            .get<ISuperHero[]>(
                environment.httpServer +
                    `/super-heroes?_sort=${sort}&_order=${order}&_page=${(page ?? 0) + 1}&_limit=${itemsPerPage}${
                        nameQuery ? '&' + nameQuery : ''
                    }${idQuery ? '&' + idQuery : ''}`,
                { observe: 'response' }
            )
            .pipe(
                map((res: HttpResponse<ISuperHero[]>): ISuperHeroesHttpResponse => {
                    return {
                        resBody: res.body ?? [],
                        totalCount: +(res.headers.get('X-Total-Count') ?? 0),
                    };
                }),
                catchError((error: HttpErrorResponse): Observable<never> => {
                    return throwError(() => error);
                })
            );
    }

    public createSuperHero(hero: ISuperHeroEdition): Observable<ISuperHero> {
        return this.httpClient.post<ISuperHero>(environment.httpServer + '/super-heroes', hero).pipe(
            catchError((error: HttpErrorResponse): Observable<never> => {
                return throwError(() => error);
            })
        );
    }

    public editSuperHero(hero: ISuperHeroEdition, id: number): Observable<ISuperHero> {
        return this.httpClient.put<ISuperHero>(environment.httpServer + `/super-heroes/${id}`, hero).pipe(
            catchError((error: HttpErrorResponse): Observable<never> => {
                return throwError(() => error);
            })
        );
    }

    public deleteSuperHero(id: number): Observable<ISuperHero> {
        return this.httpClient.delete<ISuperHero>(environment.httpServer + `/super-heroes/${id}`).pipe(
            catchError((error: HttpErrorResponse): Observable<never> => {
                return throwError(() => error);
            })
        );
    }
}
