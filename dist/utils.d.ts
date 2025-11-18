import { IContentType } from './model';
declare global {
    interface String {
        camelCase(): string;
        underscore(): string;
    }
    interface Object {
        dump(): string;
    }
}
export declare function extendPrototypes(): void;
export declare function indexById(types: IContentType[]): {
    [id: string]: IContentType;
};
export declare function indexByContentType<T>(items: T[]): {
    [id: string]: T;
};
export declare function wait(ms: number): Promise<void>;
export declare function formatFile(file: string): Promise<void>;
export declare function eachInSequence<T, U>(items: T[], op: (item: T, index?: number, items?: T[]) => Promise<U>): Promise<U[]>;
