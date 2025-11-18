import { IArgs } from './main';
import { IContentType, IEditorInterface } from './model';
export interface ISource {
    id: string;
    contentTypes: IContentType[];
    editorInterfaces: IEditorInterface[];
}
export declare function loadSources(args: IArgs): Promise<ISource[]>;
