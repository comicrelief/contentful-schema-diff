import { IContentType } from './model';
import { IContext } from './runners';
export declare function writeModify(from: IContentType, to: IContentType, write: (chunk: string) => Promise<any>, context: IContext): Promise<void>;
