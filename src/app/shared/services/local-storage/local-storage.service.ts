import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    public setObject(key: string, value: object): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    public getObject(key: string): object | null {
        if (localStorage.getItem(key) !== null) {
            return JSON.parse(localStorage.getItem(key)!);
        } else {
            return null;
        }
    }
}
