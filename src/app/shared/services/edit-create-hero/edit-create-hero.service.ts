import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';
import { EditCreateHeroComponent } from '../../../components/modals/edit-create-hero/edit-create-hero.component';
import { OptionalType } from '../../models/types/optional.type';
import { finalize } from 'rxjs/internal/operators/finalize';

@Injectable()
export class EditCreateHeroService {
    public dialogRef: OptionalType<MatDialogRef<EditCreateHeroComponent>>;

    constructor(public readonly matDialog: MatDialog) {}

    public openModal(id?: number): Observable<boolean> {
        this.dialogRef = this.matDialog.open(EditCreateHeroComponent);

        if (id && this.dialogRef) {
            this.dialogRef.componentInstance.id = id;
        }

        return this.dialogRef.afterClosed().pipe(
            finalize((): void => {
                this.dialogRef = null;
            })
        );
    }
}
