import { TestBed } from '@angular/core/testing';

import { SuperHeroHttpService } from './super-hero-http.service';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { NEVER } from 'rxjs/internal/observable/never';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Observable } from 'rxjs/internal/Observable';
import { ISuperHero, ISuperHeroesHttpResponse } from '../../models/interfaces/super-hero.interface';
import {
    GET_HEROES_PARAMS_MOCK,
    SEARCH_SUPER_HERO_BY_NAME,
    SUPER_HEROES_RESPONSE_MOCKS,
    SUPER_HERO_1,
} from '../../../mocks/super-heroes-response-mocks';

describe('SuperHeroHttpServiceService', (): void => {
    let service: SuperHeroHttpService;
    let httpController: HttpTestingController;

    let url: string = 'http://localhost:3000/';

    beforeEach((): void => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(SuperHeroHttpService);
        httpController = TestBed.inject(HttpTestingController);
    });

    describe('when getHeroes() is called without name and id', (): void => {
        it('should call getHeroes and return an array of all Super Heroes', (): void => {
            service
                .getHeroes(
                    GET_HEROES_PARAMS_MOCK.sort,
                    GET_HEROES_PARAMS_MOCK.order,
                    GET_HEROES_PARAMS_MOCK.page,
                    GET_HEROES_PARAMS_MOCK.itemsPerPAge
                )
                .subscribe((data: any): void => {
                    expect(data).toEqual(SUPER_HEROES_RESPONSE_MOCKS);
                });

            const req: TestRequest = httpController.expectOne({
                method: 'GET',
                url: `${url}super-heroes?_sort=${GET_HEROES_PARAMS_MOCK.sort}&_order=${
                    GET_HEROES_PARAMS_MOCK.order
                }&_page=${GET_HEROES_PARAMS_MOCK.page + 1}&_limit=${GET_HEROES_PARAMS_MOCK.itemsPerPAge}`,
            });

            req.flush(SUPER_HEROES_RESPONSE_MOCKS.resBody);
        });

        it('should return an error when the server returns a 404 error', (): void => {
            service
                .getHeroes(
                    GET_HEROES_PARAMS_MOCK.sort,
                    GET_HEROES_PARAMS_MOCK.order,
                    GET_HEROES_PARAMS_MOCK.page,
                    GET_HEROES_PARAMS_MOCK.itemsPerPAge
                )
                .pipe(
                    catchError((error: HttpErrorResponse): Observable<never> => {
                        expect(error).toEqual(error);
                        return NEVER;
                    })
                )
                .subscribe();

            httpController
                .expectOne({
                    method: 'GET',
                })
                .flush('', {
                    status: 404,
                    statusText: 'Not Found',
                });
        });
    });

    describe('getHeroById()', (): void => {
        it('should call getHeroById and return the appropriate Super hero', (): void => {
            const id = 1;

            service.getHeroById(id).subscribe((data: ISuperHero) => {
                expect(data).toEqual(SUPER_HERO_1);
            });

            const req: TestRequest = httpController.expectOne({
                method: 'GET',
                url: `${url}super-heroes/${id}`,
            });

            req.flush(SUPER_HERO_1);
        });

        it('getHeroById() return an error when the server returns a 404 error', (): void => {
            service
                .getHeroById(1)
                .pipe(
                    catchError((error: HttpErrorResponse): Observable<never> => {
                        expect(error).toEqual(error);
                        return NEVER;
                    })
                )
                .subscribe();

            httpController
                .expectOne({
                    method: 'GET',
                })
                .flush('', {
                    status: 404,
                    statusText: 'Not Found',
                });
        });
    });

    describe('when getHeroes() is called with name and empty id', (): void => {
        it('should call searchHeroesByQuery let empty id and fill the name and return the super hero', (): void => {
            const nameQuery: string = 'sup';

            service
                .getHeroes(
                    GET_HEROES_PARAMS_MOCK.sort,
                    GET_HEROES_PARAMS_MOCK.order,
                    GET_HEROES_PARAMS_MOCK.page,
                    GET_HEROES_PARAMS_MOCK.itemsPerPAge,
                    nameQuery,
                    ''
                )
                .subscribe((data: ISuperHeroesHttpResponse): void => {
                    expect(data).toEqual(SEARCH_SUPER_HERO_BY_NAME);
                });

            const req: TestRequest = httpController.expectOne({
                method: 'GET',
                url: `${url}super-heroes?_sort=${GET_HEROES_PARAMS_MOCK.sort}&_order=${
                    GET_HEROES_PARAMS_MOCK.order
                }&_page=${GET_HEROES_PARAMS_MOCK.page + 1}&_limit=${
                    GET_HEROES_PARAMS_MOCK.itemsPerPAge
                }&name_like=${nameQuery}`,
            });

            req.flush(SEARCH_SUPER_HERO_BY_NAME.resBody);
        });

        describe('when getHeroes() is called with a nname and id', (): void => {
            it('should call getHeroes and return a superheroo by id and name', (): void => {
                const nameQuery: string = 'sup';
                const id: string = '1';

                service
                    .getHeroes(
                        GET_HEROES_PARAMS_MOCK.sort,
                        GET_HEROES_PARAMS_MOCK.order,
                        GET_HEROES_PARAMS_MOCK.page,
                        GET_HEROES_PARAMS_MOCK.itemsPerPAge,
                        nameQuery,
                        id
                    )
                    .subscribe((data: ISuperHeroesHttpResponse): void => {
                        expect(data.resBody).toEqual(SEARCH_SUPER_HERO_BY_NAME.resBody);
                    });

                const req: TestRequest = httpController.expectOne({
                    method: 'GET',
                    url: `${url}super-heroes?_sort=${GET_HEROES_PARAMS_MOCK.sort}&_order=${
                        GET_HEROES_PARAMS_MOCK.order
                    }&_page=${GET_HEROES_PARAMS_MOCK.page + 1}&_limit=${
                        GET_HEROES_PARAMS_MOCK.itemsPerPAge
                    }&name_like=${nameQuery}&id=${id}`,
                });

                req.flush(SEARCH_SUPER_HERO_BY_NAME.resBody);
            });
        });
    });

    describe('createSuperHero()', (): void => {
        it('should call createSuperHero  and create super hero', (): void => {
            const hero: ISuperHero = {
                name: 'super man',
                description: 'A men with spider powers',
                id: 1,
            };

            service.createSuperHero(hero).subscribe((data: ISuperHero): void => {
                expect(data).toEqual(SUPER_HERO_1);
            });

            const req: TestRequest = httpController.expectOne({
                method: 'POST',
                url: `${url}super-heroes`,
            });

            req.flush(SUPER_HERO_1);
        });

        it('createSuperHero() return an error when the server returns a 404 error', (): void => {
            const hero: ISuperHero = {
                name: 'super man',
                description: 'A men with spider powers',
                id: 1,
            };

            service
                .createSuperHero(hero)
                .pipe(
                    catchError((error: HttpErrorResponse): Observable<never> => {
                        expect(error).toEqual(error);
                        return NEVER;
                    })
                )
                .subscribe();
            httpController
                .expectOne({
                    method: 'POST',
                })
                .flush('', {
                    status: 404,
                    statusText: 'Not Found',
                });
        });
    });

    describe('editSuperHero()', (): void => {
        it('should call editSuperHero  and edit a super hero', (): void => {
            const hero: ISuperHero = {
                name: 'super man',
                description: 'A men with spider powers',
                id: 1,
            };

            service.editSuperHero(hero, hero.id).subscribe((data: ISuperHero): void => {
                expect(data).toEqual(SUPER_HERO_1);
            });

            const req: TestRequest = httpController.expectOne({
                method: 'PUT',
                url: `${url}super-heroes/${hero.id}`,
            });

            req.flush(SUPER_HERO_1);
        });

        it('editSuperHero() return an error when the server returns a 404 error', (): void => {
            const hero: ISuperHero = {
                name: 'super man',
                description: 'A men with spider powers',
                id: 1,
            };

            service
                .editSuperHero(hero, hero.id)
                .pipe(
                    catchError((error: HttpErrorResponse): Observable<never> => {
                        expect(error).toEqual(error);
                        return NEVER;
                    })
                )
                .subscribe();
            httpController
                .expectOne({
                    method: 'PUT',
                })
                .flush('', {
                    status: 404,
                    statusText: 'Not Found',
                });
        });
    });

    describe('when deleteSuperHero() is call', (): void => {
        it('should delete a super hero', (): void => {
            const id = 1;

            service.deleteSuperHero(id).subscribe((data: ISuperHero): void => {
                expect(data).toEqual(SUPER_HERO_1);
            });

            const req: TestRequest = httpController.expectOne({
                method: 'DELETE',
                url: `${url}super-heroes/${id}`,
            });

            req.flush(SUPER_HERO_1);
        });

        it('deleteSuperHero() return an error when the server returns a 404 error', (): void => {
            service
                .deleteSuperHero(1)
                .pipe(
                    catchError((error: HttpErrorResponse): Observable<never> => {
                        expect(error).toEqual(error);
                        return NEVER;
                    })
                )
                .subscribe();
            httpController
                .expectOne({
                    method: 'DELETE',
                })
                .flush('', {
                    status: 404,
                    statusText: 'Not Found',
                });
        });
    });
});
