export interface IArgs {
    /** A contentful export file, or Contentful Space ID */
    from: string;
    /** A contentful export file, space ID, or environment within the "from" space */
    to: string;
    /** (optional) Write all the migrations in a single file */
    oneFile?: boolean;
    /** (optional) auto-format the file using detected linter (default true) */
    format?: boolean;
    /** The output directory (or file if '--oneFile' was specified) */
    out: string;
    /** The type of file to write - defaults to Javascript files unless 'ts' is specified */
    extension?: 'js' | 'ts';
    /**
     * A Contentful management token to download content types from a space.
     * Not required if both `from` and `to` are files.
     */
    managementToken?: string;
    /** Generate a migration only for these content types. */
    contentTypes: string[];
}
export default function Run(args: IArgs): Promise<string[]>;
