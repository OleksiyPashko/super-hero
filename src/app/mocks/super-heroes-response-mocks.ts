import {
    ISuperHero,
    ISuperHeroEdition,
    ISuperHeroesHttpResponse,
} from '../shared/models/interfaces/super-hero.interface';

export const SUPER_HEROES_RESPONSE_MOCKS: ISuperHeroesHttpResponse = {
    resBody: [
        {
            name: 'SUPER MAN',
            description: 'Fly',
            id: 1,
        },
        {
            name: 'SPIDER MAN',
            description: 'Spider',
            id: 2,
        },
        {
            name: 'THOR',
            description: 'A soon of a god',
            id: 3,
        },
        {
            name: 'IRON MAN',
            description: 'A rich guy',
            id: 4,
        },
        {
            name: 'BLACK WIDOW',
            description: 'A super woman',
            id: 5,
        },
        {
            name: 'HULK',
            description: 'A big green man (like shrek)',
            id: 6,
        },
    ],
    totalCount: 0,
};

export const SUPER_HERO_1: ISuperHero = {
    name: 'SUPER MAN',
    description: 'Fly',
    id: 1,
};

export const SUPER_HERO_FORM_MOCK: ISuperHeroEdition = {
    name: 'SUPER MAN',
    description: 'Fly',
};

export const SEARCH_SUPER_HERO_BY_NAME: ISuperHeroesHttpResponse = {
    resBody: [
        {
            name: 'SUPER MAN',
            description: 'Fly',
            id: 1,
        },
    ],
    totalCount: 0,
};

export const GET_HEROES_PARAMS_MOCK = {
    sort: 'created',
    order: 'desc',
    page: 0,
    itemsPerPAge: 5,
};
