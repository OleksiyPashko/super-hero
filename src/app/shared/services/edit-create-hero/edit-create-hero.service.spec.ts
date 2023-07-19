import { TestBed } from '@angular/core/testing';

import { EditCreateHeroService } from './edit-create-hero.service';
import { of } from 'rxjs/internal/observable/of';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { EditCreateHeroComponent } from '../../../components/modals/edit-create-hero/edit-create-hero.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../translate/translate.module';
import { HttpClient } from '@angular/common/http';
import createSpyObj = jasmine.createSpyObj;

describe('EditCreateHeroService', (): void => {
    let service: EditCreateHeroService;
    const dialogMock = {
        close: () => {},
    };

    let dialogSpy: jasmine.Spy;
    let dialogRefSpyObj = createSpyObj({
        afterClosed: of({}),
        close: null,
    });
    dialogRefSpyObj.componentInstance = { body: '' };

    beforeEach((): void => {
        TestBed.configureTestingModule({
            imports: [
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
            providers: [
                EditCreateHeroService,
                {
                    provide: MatDialogRef,
                    useValue: dialogMock,
                },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: [],
                },
            ],
        });
        service = TestBed.inject(EditCreateHeroService);
    });

    it('should be created', (): void => {
        expect(service).toBeTruthy();
    });

    describe('when openModal() is get called', (): void => {
        beforeEach((): void => {
            dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
        });

        it('open modal ', (): void => {
            const id: number = 1;

            service.openModal(id);

            expect(dialogSpy).toHaveBeenCalled();
            expect(dialogSpy).toHaveBeenCalledWith(EditCreateHeroComponent);
            expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
        });
    });
});
