import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';
import { OptionalType } from '../../models/types/optional.type';
import { ConfirmDialogComponent } from '../../modals/confirm-dialog/confirm-dialog.component';
import { finalize } from 'rxjs/internal/operators/finalize';
import { IConfirmationModal } from '../../models/interfaces/confirmation-modal.interface';

@Injectable()
export class ConfirmDialogModalService {
    public dialogRef: OptionalType<MatDialogRef<ConfirmDialogComponent>>;

    constructor(public readonly matDialog: MatDialog) {}

    public openModal(dialogData: IConfirmationModal): Observable<boolean> {
        this.dialogRef = this.matDialog.open(ConfirmDialogComponent);

        this.dialogRef.componentInstance.title = dialogData.title;
        this.dialogRef.componentInstance.message = dialogData.message;

        return this.dialogRef.afterClosed().pipe(
            finalize((): void => {
                this.dialogRef = null;
            })
        );
    }
}
