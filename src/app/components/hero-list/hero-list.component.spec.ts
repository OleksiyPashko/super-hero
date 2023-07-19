import { ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HeroListComponent } from './hero-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ISuperHero, ISuperHeroesHttpResponse } from '../../shared/models/interfaces/super-hero.interface';
import { SUPER_HERO_1, SUPER_HEROES_RESPONSE_MOCKS } from '../../mocks/super-heroes-response-mocks';
import { of } from 'rxjs/internal/observable/of';
import { FormBuilder } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../../translate/translate.module';
import { SuperHeroHttpService } from '../../shared/services/super-hero-http/super-hero-http.service';
import { EditCreateHeroService } from '../../shared/services/edit-create-hero/edit-create-hero.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IConfirmationModal } from '../../shared/models/interfaces/confirmation-modal.interface';
import { ConfirmDialogComponent } from '../../shared/modals/confirm-dialog/confirm-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmDialogModalService } from '../../shared/services/remove-hero-modal/confirm-dialog-modal.service';

describe('HeroListComponent', (): void => {
    let component: HeroListComponent;
    let confirmDialogComponent: ConfirmDialogComponent;
    let fixture: ComponentFixture<HeroListComponent>;
    let fixtureConfirmationModal: ComponentFixture<ConfirmDialogComponent>;
    let superHeroHttpService: SuperHeroHttpService;
    let editCreateHeroService: EditCreateHeroService;
    let confirmDialogModalService: ConfirmDialogModalService;

    beforeEach(async (): Promise<void> => {
        await TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                HttpClientTestingModule,
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: HttpLoaderFactory,
                        deps: [HttpClient],
                    },
                }),
                MatDialogModule,
            ],
            declarations: [HeroListComponent, ConfirmDialogComponent, MatSort, MatPaginator],
            providers: [
                FormBuilder,
                SuperHeroHttpService,
                EditCreateHeroService,
                ConfirmDialogModalService,
                {
                    provide: MatDialogRef,
                    useValue: {},
                },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: [],
                },
            ],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(HeroListComponent);
        fixtureConfirmationModal = TestBed.createComponent(ConfirmDialogComponent);
        component = fixture.componentInstance;
        confirmDialogComponent = fixtureConfirmationModal.componentInstance;
        superHeroHttpService = TestBed.inject(SuperHeroHttpService);
        editCreateHeroService = TestBed.inject(EditCreateHeroService);
        confirmDialogModalService = TestBed.inject(ConfirmDialogModalService);
        fixture.detectChanges();
    });

    it('should create', (): void => {
        expect(component).toBeTruthy();
    });

    describe('when clearFilters() is called', (): void => {
        it('should call resetInputFields() and getHeroes() and clear the inputs', fakeAsync((): void => {
            const response: ISuperHeroesHttpResponse = SUPER_HEROES_RESPONSE_MOCKS;

            spyOn<any>(component, 'resetInputFields');

            spyOn(superHeroHttpService, 'getHeroes').and.returnValue(of(response));

            const spy = spyOn(component, 'clearFilters').and.callThrough();

            component.clearFilters();

            expect(component['resetInputFields']).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledTimes(1);
            expect(component.dataSource).toEqual(response.resBody);
            discardPeriodicTasks();
        }));
    });

    describe('when resetInputFields() is called', (): void => {
        it('should clear search inputs value', fakeAsync(() => {
            component.searchByNameControl.patchValue('sup');
            component.searchByIdControl.patchValue(1);

            component['resetInputFields']();

            expect(component.searchByIdControl.value).toEqual(null);
            expect(component.searchByNameControl.value).toEqual(null);
        }));
    });

    describe('when deleteSuperHero() is get called', (): void => {
        it('should remove the super hero and return a new list of super heroes', fakeAsync(() => {
            const deleteResponse: ISuperHero = SUPER_HERO_1;
            const response: ISuperHeroesHttpResponse = SUPER_HEROES_RESPONSE_MOCKS;

            const spyOnDelete = spyOn(superHeroHttpService, 'deleteSuperHero').and.returnValue(of(deleteResponse));

            const spyOnGet = spyOn(superHeroHttpService, 'getHeroes').and.returnValue(of(response));

            component.deleteSuperHero(deleteResponse.id);

            expect(spyOnGet).toHaveBeenCalled();
            expect(spyOnDelete).toHaveBeenCalled();
            discardPeriodicTasks();
        }));
    });

    describe('when openEditHeroModal() is get called', (): void => {
        it('should reset the search inputs and open the edition modal and pass an id, on close get all super heroes if success', fakeAsync((): void => {
            const id: number = 1;
            const response: ISuperHeroesHttpResponse = SUPER_HEROES_RESPONSE_MOCKS;

            spyOn<any>(component, 'resetInputFields');

            spyOn(editCreateHeroService, 'openModal').and.returnValue(of(true));

            spyOn(superHeroHttpService, 'getHeroes').and.returnValue(of(response));

            component.openEditHeroModal(id);

            expect(component['resetInputFields']).toHaveBeenCalled();
            expect(editCreateHeroService.openModal).toHaveBeenCalledWith(id);
            expect(superHeroHttpService.getHeroes).toHaveBeenCalled();
            discardPeriodicTasks();
        }));
    });

    describe('when openCreateHeroModal() is get called', (): void => {
        it('should reset the search inputs and open the edition modal, on close get all super heroes if success', fakeAsync((): void => {
            spyOn(editCreateHeroService, 'openModal').and.returnValue(of(true));

            component.openCreateHeroModal();

            expect(editCreateHeroService.openModal).toHaveBeenCalled();
            discardPeriodicTasks();
        }));
    });

    describe('when openRemoveConfirmDialog() is get called', (): void => {
        it('should reset the search inputs and open the edition modal, on close get all super heroes if success', fakeAsync((): void => {
            const id: number = 1;
            const spyOnDelete = spyOn(superHeroHttpService, 'deleteSuperHero').and.returnValue(of(SUPER_HERO_1));

            const dialogData: IConfirmationModal = {
                title: 'areYourSure',
                message: 'ifYouClickYesRemove',
            };

            const spyOnOpen = spyOn(confirmDialogModalService, 'openModal')
                .withArgs(dialogData)
                .and.returnValue(of(true));

            component.openRemoveConfirmDialog(id);

            expect(confirmDialogModalService.openModal).toHaveBeenCalled();
            expect(spyOnOpen).toHaveBeenCalled();
            expect(spyOnOpen).toHaveBeenCalledTimes(1);
            expect(spyOnDelete).toHaveBeenCalled();
            expect(spyOnDelete).toHaveBeenCalledTimes(1);
            discardPeriodicTasks();
        }));
    });
});
