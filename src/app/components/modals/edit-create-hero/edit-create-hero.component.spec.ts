import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { EditCreateHeroComponent } from './edit-create-hero.component';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { ISuperHeroEdition } from '../../../shared/models/interfaces/super-hero.interface';
import { SUPER_HERO_FORM_MOCK } from '../../../mocks/super-heroes-response-mocks';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SuperHeroHttpService } from '../../../shared/services/super-hero-http/super-hero-http.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../translate/translate.module';
import { HttpClient } from '@angular/common/http';

describe('EditHeroComponent', (): void => {
    let component: EditCreateHeroComponent;
    let fixture: ComponentFixture<EditCreateHeroComponent>;
    let superHeroHttpService: SuperHeroHttpService;
    let element;

    const dialogMock = {
        close: (): void => {},
    };

    beforeEach(async (): Promise<void> => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MatDialogModule,
                TranslateModule.forRoot({
                    defaultLanguage: 'en',
                    loader: {
                        provide: TranslateLoader,
                        useFactory: HttpLoaderFactory,
                        deps: [HttpClient],
                    },
                }),
            ],
            declarations: [EditCreateHeroComponent],

            providers: [
                FormBuilder,
                SuperHeroHttpService,
                {
                    provide: MatDialogRef,
                    useValue: dialogMock,
                },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: [],
                },
            ],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(EditCreateHeroComponent);
        component = fixture.componentInstance;
        superHeroHttpService = TestBed.inject(SuperHeroHttpService);
        element = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should create', (): void => {
        expect(component).toBeTruthy();
    });

    describe('ngOnInit() when id is present', (): void => {
        it('should call getHeroById and return list of users', fakeAsync((): void => {
            const response: ISuperHeroEdition = SUPER_HERO_FORM_MOCK;
            spyOn(superHeroHttpService, 'getHeroById').and.returnValue(
                of({
                    ...response,
                    id: 1,
                })
            );
            component['getHeroById'](1);
            tick();
            expect(component.form.value).toEqual(response);
        }));
    });

    describe('when createSuperHero() is called', (): void => {
        it('should call createSuperHero from service', fakeAsync((): void => {
            const response: ISuperHeroEdition = SUPER_HERO_FORM_MOCK;
            let spy = spyOn(component.matDialogRef, 'close').and.callThrough();

            spyOn(superHeroHttpService, 'createSuperHero').and.returnValue(
                of({
                    ...response,
                    id: 1,
                })
            );

            component.form.patchValue(response);
            component.createSuperHero();

            tick();
            expect(superHeroHttpService.createSuperHero).toHaveBeenCalledWith(response);
            expect(spy).toHaveBeenCalled();
        }));
    });

    describe('when editSuperHero() is called', (): void => {
        it('should call EditSuperHero from service', fakeAsync((): void => {
            const response: ISuperHeroEdition = SUPER_HERO_FORM_MOCK;
            const id = 1;
            let spy = spyOn(component.matDialogRef, 'close').and.callThrough();

            spyOn(superHeroHttpService, 'editSuperHero').and.returnValue(
                of({
                    ...response,
                    id: id,
                })
            );

            component.form.patchValue(response);
            component.editSuperHero(id);

            tick();
            expect(superHeroHttpService.editSuperHero).toHaveBeenCalledWith(response, id);
            expect(spy).toHaveBeenCalled();
        }));
    });
});
