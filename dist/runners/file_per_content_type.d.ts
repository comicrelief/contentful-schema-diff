/// <reference types="node" />
import * as fs from 'fs-extra';
import { IContext } from '.';
import { AsyncWrite } from './async_writer';
interface IOptions {
    header: string;
    footer: string;
    extension: 'js' | 'ts';
    format: boolean;
}
export declare class FilePerContentTypeRunner {
    outDir: string;
    readonly options: Readonly<IOptions>;
    streams: Array<{
        stream: fs.WriteStream;
        writer: AsyncWrite;
        fileName: string;
        context: IContext;
    }>;
    constructor(outDir: string, options?: Partial<IOptions>);
    init(): Promise<void>;
    run(keys: string[], run: (id: string, write: AsyncWrite, context: IContext) => Promise<void>): Array<Promise<void>>;
    close(): Promise<string[]>;
    private makeWriter;
}
export {};
