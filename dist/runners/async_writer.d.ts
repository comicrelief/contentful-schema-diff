/// <reference types="node" />
import { Writable } from 'stream';
export declare type AsyncWrite = (chunk: string) => Promise<any>;
export declare function asyncWriter(stream: Writable): (chunk: string) => Promise<any>;
