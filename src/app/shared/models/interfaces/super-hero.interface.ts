import { OptionalType } from '../types/optional.type';

export interface ISuperHero {
    id: number;
    name: string;
    description?: string;
}

export interface ISuperHeroEdition {
    name: string;
    description?: string;
}

export interface ISuperHeroesHttpResponse {
    resBody: ISuperHero[];
    totalCount: number;
}
