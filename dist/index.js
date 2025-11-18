"use strict";
// tslint:disable no-console
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fs = __importStar(require("fs-extra"));
var yargs = __importStar(require("yargs"));
var main_1 = __importDefault(require("./main"));
var argv = yargs
    .usage('$0 --from <export file or space> --to <export file or space>')
    .option('from', {
    alias: 'f',
    demandOption: true,
    description: 'A contentful export file, or Contentful Space ID'
})
    .option('to', {
    alias: 't',
    demandOption: true,
    description: 'A contentful export file, space ID, or environment within the "from" space'
})
    .option('content-type', {
    alias: 'c',
    description: 'Generate a migration only for this content type.  Repeat to select multiple types.'
})
    .option('out', {
    alias: 'o',
    description: 'The output directory (or file if "--one-file" was specified) in which to place the migration'
})
    .option('js', {
    type: 'boolean',
    description: 'force writing javascript files'
})
    .option('ts', {
    type: 'boolean',
    description: 'force writing typescript files'
})
    .option('token', {
    alias: 'a',
    description: 'A Contentful management token to download content types from a space'
})
    .option('one-file', {
    description: 'Write all the migrations in a single file'
})
    .option('no-format', {
    alias: 'F',
    type: 'boolean',
    description: 'disables formatting the output file'
})
    .argv;
if (!argv.out) {
    if (fs.existsSync('./db/migrate/')) {
        argv.out = './db/migrate/';
    }
    else {
        argv.out = './';
    }
}
fs.mkdirpSync(argv.out);
var extension;
if (argv.ts) {
    extension = 'ts';
}
else if (argv.js) {
    extension = 'js';
}
else {
    // auto-detect extension
    var contents = fs.readdirSync(argv.out);
    if (contents.find(function (filename) { return /\.ts/.test(filename); })) {
        extension = 'ts';
    }
    else {
        extension = 'js';
    }
}
var contentTypes = argv.contentType && (Array.isArray(argv.contentType) ? argv.contentType : [argv.contentType]);
main_1["default"]({
    from: argv.from,
    out: argv.out,
    to: argv.to,
    managementToken: argv.token || process.env.CONTENTFUL_MANAGEMENT_TOKEN,
    oneFile: argv.oneFile,
    format: !argv['no-format'],
    extension: extension,
    contentTypes: contentTypes
})
    .then(function (files) {
    files.forEach(function (file) { return console.log(file); });
})["catch"](function (err) {
    console.error(err);
});
//# sourceMappingURL=index.js.map