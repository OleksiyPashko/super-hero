/**
 * @description
 * An elegant way to manage nil types in the library
 * It is easier to always handle both null and undefined cases
 */
export type OptionalType<T> = T | null | undefined;
