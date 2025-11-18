import { IContentType, IField } from './model';
export declare function fakeContentType(id?: string, ...fields: IContentType['fields']): IContentType;
export declare function fakeField(field: Partial<IField>): IField;
