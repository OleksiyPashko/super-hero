export enum ESpanishLanguage {
    CODE = 'es-ES',
    LABEL = 'Español',
}

export enum EEnglishLanguage {
    CODE = 'en',
    LABEL = 'English',
}

export type LanguageCodeType = EEnglishLanguage.CODE | ESpanishLanguage.CODE;
export type LanguageLabelType = EEnglishLanguage.LABEL | ESpanishLanguage.LABEL;
