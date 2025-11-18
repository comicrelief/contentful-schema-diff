/**
 * A Diff can be either an object or array, depending on what you diffed.
 * If you diffed two arrays, you can expect it to be a DiffArray<TItem> type.
 */
export declare type Diff = DiffArray<any> | DiffObj<any>;
/**
 * A DiffArray is a Diff of two arrays.  It contains a set of DiffItems.
 */
export declare type DiffArray<T> = Array<DiffItem<T>>;
/**
 * A DiffItem is an array with two values - the first is the operation:
 * "+" indicates the value was added to the array
 * "-" indicates the value was removed from the array
 * "~" indicates the value is still in the array but has changed
 * " " indicates the value did not change.
 *
 * The second value is either a whole object in the case of "+" or "-",
 * or a diff of an object.
 *
 * In the case of an array of arrays, the "~" value would be a DiffArray,
 * but we can't model that in typescript because it's a circluar reference.
 * Maybe if we defined the interface better...
 */
export declare type DiffItem<T> = ['-' | '+', T] | ['~', DiffObj<T>] | [' ', undefined];
/**
 * Represents a change in a primitive field value
 */
export interface ISimpleDiff<T> {
    '__old': T;
    '__new': T;
}
/**
 * A diff of two objects.  Every key that changes is represented
 */
export declare type DiffObj<T> = {
    [field in keyof T]: Diff | ISimpleDiff<any>;
};
export declare function isDiff(obj: any | Diff): obj is Diff;
export declare function isDiffObj<T>(obj: T | DiffObj<T>): obj is DiffObj<T>;
export declare function isDiffArray<T>(arr: T[] | Array<DiffArray<T>>): arr is Array<DiffArray<T>>;
export declare function isDiffItem<T>(val: T | DiffItem<T>): boolean;
export declare function isSimpleDiff<T>(diff: Diff | ISimpleDiff<T>): diff is ISimpleDiff<T>;
