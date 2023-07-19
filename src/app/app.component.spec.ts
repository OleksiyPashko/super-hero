import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', (): void => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async (): Promise<void> => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [AppComponent],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
    });

    it('should create the app', (): void => {
        expect(component).toBeTruthy();
    });

    describe('when ngOnInit() is called', (): void => {
        it('should call ', (): void => {
            spyOn<any>(component, 'listenToLoading');

            component.ngOnInit();

            expect(component['listenToLoading']).toHaveBeenCalled();
        });
    });
});
