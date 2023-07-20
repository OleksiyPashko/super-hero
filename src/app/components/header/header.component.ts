import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from '../../shared/services/local-storage/local-storage.service';
import { ILanguage } from '../../models/interfaces/language.interface';
import { EEnglishLanguage, ESpanishLanguage } from '../../models/enums/language.enum';

const LANGUAGE_KEY: string = 'language';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    public readonly SPANISH_LANGUAGE: ILanguage = {
        code: ESpanishLanguage.CODE,
        label: ESpanishLanguage.LABEL,
    };

    public readonly ENGLISH_LANGUAGE: ILanguage = {
        code: EEnglishLanguage.CODE,
        label: EEnglishLanguage.LABEL,
    };

    public siteLanguage: ILanguage = this.ENGLISH_LANGUAGE;

    constructor(
        private readonly translateService: TranslateService,
        private readonly localStorageService: LocalStorageService
    ) {}

    public ngOnInit(): void {
        this.siteLanguage = (this.localStorageService.getObject(LANGUAGE_KEY) as ILanguage) ?? this.ENGLISH_LANGUAGE;
        this.changeSiteLanguage(this.siteLanguage);
    }

    public changeSiteLanguage(language: ILanguage): void {
        this.siteLanguage = language;
        this.translateService.use(language.code);
        this.localStorageService.setObject(LANGUAGE_KEY, language);
    }
}
