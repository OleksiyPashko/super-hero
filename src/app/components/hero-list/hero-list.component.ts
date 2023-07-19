import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ISuperHero, ISuperHeroesHttpResponse } from '../../shared/models/interfaces/super-hero.interface';
import { OptionalType } from '../../shared/models/types/optional.type';
import { first } from 'rxjs';
import { FormBuilder, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { Observable } from 'rxjs/internal/Observable';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import { startWith } from 'rxjs/internal/operators/startWith';
import { IConfirmationModal } from '../../shared/models/interfaces/confirmation-modal.interface';
import { EditCreateHeroService } from '../../shared/services/edit-create-hero/edit-create-hero.service';
import { SuperHeroHttpService } from '../../shared/services/super-hero-http/super-hero-http.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmDialogModalService } from '../../shared/services/remove-hero-modal/confirm-dialog-modal.service';
import { filter, tap } from 'rxjs/operators';

@Component({
    selector: 'app-hero-list',
    templateUrl: './hero-list.component.html',
    styleUrls: ['./hero-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroListComponent implements AfterViewInit, OnDestroy {
    public displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
    public dataSource: ISuperHero[] = [];

    @ViewChild(MatPaginator) public paginator: OptionalType<MatPaginator>;
    @ViewChild(MatSort) public sort: OptionalType<MatSort>;
    public searchByNameControl: FormControl = this.formBuilder.control('');
    public searchByIdControl: FormControl = this.formBuilder.control('');
    public resultsLength: number = 0;
    public itemsPerPage: number = 5;
    public isLimitReached: boolean = false;
    public isLoadingResults: boolean = true;
    private componentDestroyedSubject$: Subject<void> = new Subject<void>();

    constructor(
        private readonly superHeroHttpService: SuperHeroHttpService,
        private readonly formBuilder: FormBuilder,
        private readonly changeDetectorRef: ChangeDetectorRef,
        private readonly editCreateHeroService: EditCreateHeroService,
        private readonly confirmDialogModalService: ConfirmDialogModalService,
        private readonly translateService: TranslateService
    ) {}

    public ngAfterViewInit(): void {
        this.subscribeOnFilterChange();
        this.subscribeOnSortChange();
        this.subscribeOnPageChange();
    }

    public subscribeOnPageChange(): void {
        this.paginator?.page
            .pipe(
                switchMap((): Observable<ISuperHeroesHttpResponse> => {
                    return this.getSuperHeroes();
                }),
                takeUntil(this.componentDestroyedSubject$)
            )
            .subscribe();
    }

    public getSuperHeroes(): Observable<ISuperHeroesHttpResponse> {
        return this.superHeroHttpService
            .getHeroes(
                this.sort?.active,
                this.sort?.direction,
                this.paginator?.pageIndex,
                this.itemsPerPage,
                this.searchByNameControl.value,
                this.searchByIdControl.value
            )
            .pipe(
                first(),
                tap((data: ISuperHeroesHttpResponse): void => {
                    this.isLoadingResults = false;
                    this.isLimitReached = data === null;
                    this.resultsLength = data.totalCount;
                    this.dataSource = data.resBody ?? [];
                    this.changeDetectorRef.detectChanges();
                })
            );
    }

    public subscribeOnFilterChange(): void {
        if (this.sort && this.paginator) {
            combineLatest([
                this.searchByNameControl.valueChanges.pipe(startWith('')),
                this.searchByIdControl.valueChanges.pipe(startWith('')),
            ])
                .pipe(
                    debounceTime(500),
                    distinctUntilChanged((previous: [string, string], current: [string, string]): boolean => {
                        const [previousName, previousId] = previous;
                        const [currentName, currentId] = current;

                        return !(previousName !== currentName || previousId !== currentId);
                    }),
                    switchMap((controlValue: [string, string]): Observable<ISuperHeroesHttpResponse> => {
                        if (controlValue[0] || controlValue[1]) {
                            this.paginator!.pageIndex = 0;
                        }
                        this.isLoadingResults = true;
                        return this.getSuperHeroes();
                    }),
                    takeUntil(this.componentDestroyedSubject$)
                )
                .subscribe();
        }
    }

    public ngOnDestroy(): void {
        this.componentDestroyedSubject$.next();
        this.componentDestroyedSubject$.complete();
    }

    public clearFilters(): void {
        this.resetInputFields();
        this.getSuperHeroes().subscribe((): void => {
            this.paginator!.pageIndex = 0;
        });
    }

    public openCreateHeroModal(): void {
        this.editCreateHeroService
            .openModal()
            .pipe(
                first(),
                filter((isSuccess: boolean) => isSuccess),
                switchMap(() => {
                    return this.getSuperHeroes();
                })
            )
            .subscribe();
    }

    public openEditHeroModal(id: number): void {
        this.resetInputFields();
        this.editCreateHeroService
            .openModal(id)
            .pipe(
                first(),
                filter((isSuccess: boolean) => isSuccess),
                switchMap(() => {
                    return this.getSuperHeroes();
                })
            )
            .subscribe();
    }

    public openRemoveConfirmDialog(id: number): void {
        const dialogData: IConfirmationModal = {
            title: this.translateService.instant('areYourSure'),
            message: this.translateService.instant('ifYouClickYesRemove'),
        };

        this.confirmDialogModalService
            .openModal(dialogData)
            .pipe(first())
            .subscribe((isDelete: boolean): void => {
                if (isDelete) {
                    this.deleteSuperHero(id);
                }
            });
    }

    public deleteSuperHero(id: number): void {
        this.superHeroHttpService
            .deleteSuperHero(id)
            .pipe(
                switchMap(() => {
                    return this.getSuperHeroes();
                }),
                first()
            )
            .subscribe((): void => {
                this.paginator!.pageIndex = 0;
            });
    }

    private subscribeOnSortChange(): void {
        this.sort?.sortChange
            .pipe(
                switchMap((): Observable<ISuperHeroesHttpResponse> => {
                    return this.getSuperHeroes();
                }),
                takeUntil(this.componentDestroyedSubject$)
            )
            .subscribe((): number => (this.paginator!.pageIndex = 0));
    }

    private resetInputFields(): void {
        this.searchByIdControl.reset();
        this.searchByNameControl.reset();
    }
}
