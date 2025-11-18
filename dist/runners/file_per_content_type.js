"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var fs = __importStar(require("fs-extra"));
var _ = __importStar(require("lodash"));
var path = __importStar(require("path"));
var utils_1 = require("../utils");
utils_1.extendPrototypes();
var async_writer_1 = require("./async_writer");
var FilePerContentTypeRunner = /** @class */ (function () {
    function FilePerContentTypeRunner(outDir, options) {
        this.streams = [];
        this.outDir = outDir;
        this.options = Object.assign({
            header: '',
            footer: '',
            extension: 'js',
            format: true
        }, options);
    }
    FilePerContentTypeRunner.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    FilePerContentTypeRunner.prototype.run = function (keys, run) {
        var _this = this;
        return keys.map(function (id) { return __awaiter(_this, void 0, void 0, function () {
            var context, writer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        context = { operations: [] };
                        writer = this.makeWriter(id, context);
                        return [4 /*yield*/, run(id, writer, context)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    FilePerContentTypeRunner.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.all(this.streams.map(function (tuple) { return __awaiter(_this, void 0, void 0, function () {
                        var uniqOps, newFilename;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, tuple.writer(this.options.footer)];
                                case 1:
                                    _a.sent();
                                    tuple.stream.close();
                                    return [4 /*yield*/, utils_1.wait(1)
                                        // rename if operations all the same type
                                    ];
                                case 2:
                                    _a.sent();
                                    uniqOps = _.uniq(tuple.context.operations);
                                    if (!(uniqOps.length == 1)) return [3 /*break*/, 4];
                                    newFilename = tuple.fileName.replace('generated_diff', uniqOps[0]);
                                    return [4 /*yield*/, fs.move(tuple.fileName, newFilename)];
                                case 3:
                                    _a.sent();
                                    tuple.fileName = newFilename;
                                    _a.label = 4;
                                case 4:
                                    if (!this.options.format) return [3 /*break*/, 6];
                                    return [4 /*yield*/, utils_1.formatFile(tuple.fileName)];
                                case 5:
                                    _a.sent();
                                    _a.label = 6;
                                case 6: return [2 /*return*/, tuple.fileName];
                            }
                        });
                    }); }))];
            });
        });
    };
    FilePerContentTypeRunner.prototype.makeWriter = function (id, context) {
        var _this = this;
        var stream;
        var writer;
        var fileName;
        return function (chunk) { return __awaiter(_this, void 0, void 0, function () {
            var timestamp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!stream) return [3 /*break*/, 2];
                        timestamp = new Date().toISOString().replace(/[^\d]/g, '').substring(0, 14);
                        fileName = path.join(this.outDir, timestamp + "_generated_diff_" + id.underscore() + "." + this.options.extension);
                        stream = fs.createWriteStream(fileName);
                        writer = async_writer_1.asyncWriter(stream);
                        this.streams.push({ stream: stream, writer: writer, fileName: fileName, context: context });
                        return [4 /*yield*/, writer(this.options.header)];
                    case 1:
                        _a.sent();
                        context.open = true;
                        _a.label = 2;
                    case 2: return [2 /*return*/, writer(chunk)];
                }
            });
        }); };
    };
    return FilePerContentTypeRunner;
}());
exports.FilePerContentTypeRunner = FilePerContentTypeRunner;
//# sourceMappingURL=file_per_content_type.js.map