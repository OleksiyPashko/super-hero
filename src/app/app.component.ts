import { Component, OnInit } from '@angular/core';
import { LoadingService } from './core/services/loading.service';
import { delay } from 'rxjs/internal/operators/delay';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    public loading: boolean = false;

    constructor(public readonly loadingService: LoadingService) {}

    ngOnInit(): void {
        this.listenToLoading();
    }

    private listenToLoading(): void {
        this.loadingService.loadingSubject$.pipe(delay(0)).subscribe((loading: boolean): void => {
            this.loading = loading;
        });
    }
}
