import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ISuperHero, ISuperHeroEdition } from '../../../shared/models/interfaces/super-hero.interface';
import { first } from 'rxjs/internal/operators/first';
import { OptionalType } from '../../../shared/models/types/optional.type';
import { SuperHeroHttpService } from '../../../shared/services/super-hero-http/super-hero-http.service';

@Component({
    selector: 'app-edit-create-hero',
    templateUrl: './edit-create-hero.component.html',
    styleUrls: ['./edit-create-hero.component.scss'],
})
export class EditCreateHeroComponent implements OnInit {
    public id: OptionalType<number>;
    public readonly DESCRIPTION_MAX_LENGTH: number = 100;
    public readonly NAME_MIN_LENGTH: number = 2;
    public readonly NAME_MAX_LENGTH: number = 20;

    form: FormGroup<{ name: FormControl<string | null>; description: FormControl<string | null> }> =
        this.formBuilder.group({
            name: this.formBuilder.control('', [
                Validators.required,
                Validators.minLength(this.NAME_MIN_LENGTH),
                Validators.maxLength(this.NAME_MAX_LENGTH),
            ]),
            description: this.formBuilder.control('', [Validators.maxLength(this.DESCRIPTION_MAX_LENGTH)]),
        });

    constructor(
        private readonly formBuilder: FormBuilder,
        public readonly matDialogRef: MatDialogRef<EditCreateHeroComponent>,
        private readonly superHeroHttpServiceService: SuperHeroHttpService
    ) {}

    public ngOnInit(): void {
        if (this.id) {
            this.getHeroById(this.id);
        }
    }

    public cancel(): void {
        this.matDialogRef.close(false);
    }

    public createSuperHero(): void {
        this.superHeroHttpServiceService
            .createSuperHero(this.form.value as ISuperHeroEdition)
            .pipe(first())
            .subscribe((): void => this.matDialogRef.close(true));
    }

    public editSuperHero(id: number): void {
        this.superHeroHttpServiceService
            .editSuperHero(this.form.value as ISuperHero, id)
            .pipe(first())
            .subscribe((): void => this.matDialogRef.close(true));
    }

    private getHeroById(id: number): void {
        this.superHeroHttpServiceService
            .getHeroById(id)
            .pipe(first())
            .subscribe((hero: ISuperHero): void => {
                this.form.patchValue(hero);
            });
    }
}
