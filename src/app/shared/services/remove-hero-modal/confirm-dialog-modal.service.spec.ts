import { TestBed } from '@angular/core/testing';

import { ConfirmDialogModalService } from './confirm-dialog-modal.service';
import { of } from 'rxjs/internal/observable/of';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { IConfirmationModal } from '../../models/interfaces/confirmation-modal.interface';
import { ConfirmDialogComponent } from '../../modals/confirm-dialog/confirm-dialog.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../translate/translate.module';
import { HttpClient } from '@angular/common/http';
import createSpyObj = jasmine.createSpyObj;

describe('EditCreateHeroService', (): void => {
    let service: ConfirmDialogModalService;
    const dialogMock = {
        close: (): void => {},
    };

    let dialogSpy: jasmine.Spy;
    let dialogRefSpyObj = createSpyObj({
        afterClosed: of({}),
        close: null,
    });
    dialogRefSpyObj.componentInstance = {
        title: '',
        message: '',
    };

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
                ConfirmDialogModalService,
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
        service = TestBed.inject(ConfirmDialogModalService);
    });

    it('should be created', (): void => {
        expect(service).toBeTruthy();
    });

    describe('when openModal() is get called', (): void => {
        beforeEach((): void => {
            dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
        });

        it('open modal ', (): void => {
            const dialogData: IConfirmationModal = {
                title: 'areYourSure',
                message: 'ifYouClickYesRemove',
            };

            service.openModal(dialogData);

            expect(dialogSpy).toHaveBeenCalled();
            expect(dialogSpy).toHaveBeenCalledWith(ConfirmDialogComponent);
            expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
        });
    });
});
