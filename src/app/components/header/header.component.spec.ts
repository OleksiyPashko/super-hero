import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../translate/translate.module';
import { HttpClient } from '@angular/common/http';
import { SuperHeroHttpService } from '../../shared/services/super-hero-http/super-hero-http.service';
import { LocalStorageService } from '../../shared/services/local-storage/local-storage.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ILanguage } from '../../models/interfaces/language.interface';

describe('HeaderComponent', (): void => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let localStorageService: LocalStorageService;
    let translateService: TranslateService;

    beforeEach(async (): Promise<void> => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: HttpLoaderFactory,
                        deps: [HttpClient],
                    },
                }),
            ],
            declarations: [HeaderComponent],
            providers: [SuperHeroHttpService, TranslateService],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        localStorageService = TestBed.inject(LocalStorageService);
        translateService = TestBed.inject(TranslateService);
        fixture.detectChanges();
    });

    it('should create', (): void => {
        expect(component).toBeTruthy();
    });

    describe('when changeSiteLanguage()', (): void => {
        it('should change the language and set it in to localstorage', (): void => {
            const newLanguage: ILanguage = component.SPANISH_LANGUAGE;

            spyOn(localStorageService, 'setObject');
            spyOn(translateService, 'use');

            component.changeSiteLanguage(newLanguage);

            expect(localStorageService.setObject).toHaveBeenCalledWith('language', newLanguage);
            expect(translateService.use).toHaveBeenCalled();
            expect(component.siteLanguage).toEqual(newLanguage);
        });
    });
});
