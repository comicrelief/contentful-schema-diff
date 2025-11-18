import { IContentType } from './model';
import { IContext } from './runners';
export declare function writeCreate(newType: IContentType, write: (chunk: string) => Promise<any>, context: IContext): Promise<void>;
