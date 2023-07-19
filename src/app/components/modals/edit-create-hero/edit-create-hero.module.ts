import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditCreateHeroComponent } from './edit-create-hero.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { InputToUppercaseModule } from '../../../shared/directives/input-to-uppercase/input-to-uppercase.module';
import { NgxTranslateModule } from '../../../translate/translate.module';

@NgModule({
    declarations: [EditCreateHeroComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        InputToUppercaseModule,
        NgxTranslateModule,
    ],
    exports: [EditCreateHeroComponent],
})
export class EditCreateHeroModule {}
