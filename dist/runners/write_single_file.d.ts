/// <reference types="node" />
import { WriteStream } from 'fs';
import { IContext } from '.';
import { AsyncWrite } from './async_writer';
interface IOptions {
    header: string;
    footer: string;
    extension: 'js' | 'ts';
    format: boolean;
}
export declare class WriteSingleFileRunner {
    fileName: string;
    fileWriter: AsyncWrite;
    outputStream: WriteStream;
    readonly options: Readonly<IOptions>;
    constructor(out: string, options?: Partial<IOptions>);
    init(): Promise<void>;
    run(keys: string[], doRun: (id: string, write: AsyncWrite, context: IContext) => Promise<void>): Array<Promise<void>>;
    close(): Promise<string[]>;
}
export {};
