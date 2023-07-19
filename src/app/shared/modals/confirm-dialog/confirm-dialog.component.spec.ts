import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../translate/translate.module';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const dialogMock = {
    close: (isYes: boolean): void => {},
};

describe('ConfirmDialogComponent', (): void => {
    let component: ConfirmDialogComponent;
    let fixture: ComponentFixture<ConfirmDialogComponent>;

    beforeEach(async (): Promise<void> => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                TranslateModule.forRoot({
                    defaultLanguage: 'en',
                    loader: {
                        provide: TranslateLoader,
                        useFactory: HttpLoaderFactory,
                        deps: [HttpClient],
                    },
                }),
            ],
            declarations: [ConfirmDialogComponent],
            providers: [
                {
                    provide: MatDialogRef,
                    useValue: dialogMock,
                },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: [],
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ConfirmDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', (): void => {
        expect(component).toBeTruthy();
    });

    describe('when onConfirm() is clicked', (): void => {
        it('should close the modal and pass true as param', (): void => {
            let spy = spyOn(component.matDialogRef, 'close').and.callThrough();

            component.onConfirm();

            expect(spy).toHaveBeenCalledWith(true);
        });
    });

    describe('when onDismiss() is clicked', (): void => {
        it('should close the modal and pass false as param', (): void => {
            let spy = spyOn(component.matDialogRef, 'close').and.callThrough();

            component.onDismiss();

            expect(spy).toHaveBeenCalledWith(false);
        });
    });
});
