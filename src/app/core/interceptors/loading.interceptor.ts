import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
    providedIn: 'root',
})
export class LoadingInterceptor implements HttpInterceptor {
    constructor(public loaderService: LoadingService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.setLoading(true, request.url);

        return next.handle(request).pipe(
            map((httpEvent: HttpEvent<any>): HttpEvent<any> => {
                if (httpEvent instanceof HttpResponse) {
                    this.loaderService.setLoading(false, request.url);
                }
                return httpEvent;
            }),
            catchError((error: HttpErrorResponse): Observable<never> => {
                this.loaderService.setLoading(false, request.url);
                return throwError(() => error);
            })
        );
    }
}
