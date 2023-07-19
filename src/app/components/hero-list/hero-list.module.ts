import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroListComponent } from './hero-list.component';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { EditCreateHeroModule } from '../modals/edit-create-hero/edit-create-hero.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NgxTranslateModule } from '../../translate/translate.module';
import { ConfirmDialogModule } from '../../shared/modals/confirm-dialog/confirm-dialog.module';
import { EditCreateHeroService } from '../../shared/services/edit-create-hero/edit-create-hero.service';
import { ConfirmDialogModalService } from '../../shared/services/remove-hero-modal/confirm-dialog-modal.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const routes: Routes = [
    {
        path: '',
        component: HeroListComponent,
    },
];

@NgModule({
    declarations: [HeroListComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        EditCreateHeroModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        NgxTranslateModule,
        ConfirmDialogModule,
        MatProgressSpinnerModule,
    ],
    exports: [HeroListComponent],
    providers: [EditCreateHeroService, ConfirmDialogModalService],
})
export class HeroListModule {}
