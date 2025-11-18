import { IContext } from './runners';
export declare function writeDelete(id: string, write: (chunk: string) => Promise<any>, context?: IContext): Promise<void>;
