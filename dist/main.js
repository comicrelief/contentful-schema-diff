"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.__esModule = true;
var create_1 = require("./create");
var delete_1 = require("./delete");
var editor_interface_1 = require("./editor_interface");
var modify_1 = require("./modify");
var file_per_content_type_1 = require("./runners/file_per_content_type");
var write_single_file_1 = require("./runners/write_single_file");
var source_1 = require("./source");
var utils_1 = require("./utils");
function Run(args) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, from, to, fromTypes, fromEditorInterfaces, toTypes, toEditorInterfaces, headers, runner, promises;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, source_1.loadSources(args)];
                case 1:
                    _a = _b.sent(), from = _a[0], to = _a[1];
                    fromTypes = utils_1.indexById(from.contentTypes);
                    fromEditorInterfaces = utils_1.indexByContentType(from.editorInterfaces);
                    toTypes = utils_1.indexById(to.contentTypes);
                    toEditorInterfaces = utils_1.indexByContentType(to.editorInterfaces);
                    headers = makeHeaders(args);
                    runner = args.oneFile ?
                        new write_single_file_1.WriteSingleFileRunner(args.out, __assign(__assign({}, headers), args)) :
                        new file_per_content_type_1.FilePerContentTypeRunner(args.out, __assign(__assign({}, headers), args));
                    return [4 /*yield*/, runner.init()];
                case 2:
                    _b.sent();
                    promises = runner.run(Object.keys(toTypes), function (id, chunkWriter, context) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!fromTypes[id]) return [3 /*break*/, 2];
                                    return [4 /*yield*/, modify_1.writeModify(fromTypes[id], toTypes[id], chunkWriter, context)];
                                case 1:
                                    _a.sent();
                                    return [3 /*break*/, 4];
                                case 2: return [4 /*yield*/, create_1.writeCreate(toTypes[id], chunkWriter, context)];
                                case 3:
                                    _a.sent();
                                    _a.label = 4;
                                case 4: return [2 /*return*/, editor_interface_1.writeEditorInterfaceChange(fromEditorInterfaces[id], toEditorInterfaces[id], chunkWriter, context)];
                            }
                        });
                    }); });
                    promises.push.apply(promises, runner.run(Object.keys(fromTypes), function (id, chunkWriter, context) {
                        if (toTypes[id]) {
                            // handled above in 'writeModify'
                            return Promise.resolve();
                        }
                        return delete_1.writeDelete(id, chunkWriter, context);
                    }));
                    return [4 /*yield*/, Promise.all(promises)];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, runner.close()];
                case 4: return [2 /*return*/, _b.sent()];
            }
        });
    });
}
exports["default"] = Run;
function makeHeaders(args) {
    var comment = "// Generated by contentful-schema-diff\n// from " + args.from + "\n// to   " + args.to;
    if (args.extension == 'ts') {
        var header = "import Migration, { MigrationFunction } from 'contentful-migration'\n\n" + comment + "\nexport = function (migration: Migration, { makeRequest, spaceId, accessToken }) {\n";
        var footer = "\n} as MigrationFunction\n";
        return { header: header, footer: footer };
    }
    else {
        var header = comment + "\nmodule.exports = function (migration, { makeRequest, spaceId, accessToken }) {\n";
        var footer = "\n}\n";
        return { header: header, footer: footer };
    }
}
//# sourceMappingURL=main.js.map