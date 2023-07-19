import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
    public title: string = '';
    public message: string = '';

    constructor(public matDialogRef: MatDialogRef<ConfirmDialogComponent>) {}

    onConfirm(): void {
        this.matDialogRef.close(true);
    }

    onDismiss(): void {
        this.matDialogRef.close(false);
    }
}
