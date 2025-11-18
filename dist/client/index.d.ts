import _fetch from 'node-fetch';
import { IContentType, IEditorInterface } from '../model';
interface IClientOptions {
    baseUrl: string;
    spaceId: string;
    environmentId: string;
    accessToken: string;
}
export default class SimpleCMAClient {
    private readonly fetch;
    private readonly options;
    constructor(options?: Partial<IClientOptions>, fetch?: typeof _fetch);
    getContentType(contentType: string): Promise<IContentType>;
    getContentTypes(limit?: number): AsyncGenerator<IContentType>;
    getEditorInterface(contentType: string): Promise<IEditorInterface>;
    private get;
}
export declare class NotFoundError extends Error {
}
export {};
