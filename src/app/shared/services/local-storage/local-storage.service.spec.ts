import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', (): void => {
    let service: LocalStorageService;

    beforeEach((): void => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(LocalStorageService);
    });

    it('should be created', (): void => {
        expect(service).toBeTruthy();
    });

    describe('when setObject() get called', (): void => {
        it('should set an object in to localstorage', (): void => {
            const key: string = 'my_key';
            const value = { my_property: 'my_value' };

            service.setObject(key, value);

            expect(service.getObject(key)).toEqual(value);
        });
    });

    describe('when getObject() get called and return null', (): void => {
        it('should return null', (): void => {
            const key = 'my_key';

            service.setObject(key, { name: 'marco' });

            expect(service.getObject('key')).toEqual(null);
        });
    });
});
