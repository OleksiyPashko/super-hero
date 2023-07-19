import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [ConfirmDialogComponent],
    imports: [CommonModule, MatDialogModule, MatButtonModule, TranslateModule],
})
export class ConfirmDialogModule {}
