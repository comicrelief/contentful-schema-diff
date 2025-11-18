import { IEditorInterface } from './model';
import { IContext } from './runners';
export declare function writeEditorInterfaceChange(from: IEditorInterface | null, to: IEditorInterface, write: (chunk: string) => Promise<any>, context?: IContext): Promise<void>;
