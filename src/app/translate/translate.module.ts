import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(
        http,

        './assets/i18n/',

        '.json'
    );
}

@NgModule({
    declarations: [],
    imports: [CommonModule, HttpClientModule],
    exports: [TranslateModule],
})
export class NgxTranslateModule {}
