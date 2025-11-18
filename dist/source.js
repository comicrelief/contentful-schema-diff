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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
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
var client_1 = __importDefault(require("./client"));
function loadSources(args) {
    return Promise.all([
        loadSource(args.from, args),
        loadSource(args.to, args),
    ]);
}
exports.loadSources = loadSources;
function loadSource(source, args) {
    var e_1, _a, e_2, _b;
    return __awaiter(this, void 0, void 0, function () {
        var contentTypes, editorInterfaces, contents, parsed, _c, spaceId, envId, client, _d, _e, ct, e_1_1, e_3, _f, _g, ct, e_2_1, _i, contentTypes_1, ct, _h, _j;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    if (!(source == 'scratch' || source == 'empty')) return [3 /*break*/, 1];
                    // used to create migrations for a space from scratch
                    contentTypes = [];
                    editorInterfaces = [];
                    return [3 /*break*/, 35];
                case 1: return [4 /*yield*/, fs.pathExists(source)];
                case 2:
                    if (!_k.sent()) return [3 /*break*/, 4];
                    return [4 /*yield*/, fs.readFile(source)];
                case 3:
                    contents = _k.sent();
                    parsed = JSON.parse(contents.toString());
                    contentTypes = parsed.contentTypes;
                    editorInterfaces = parsed.editorInterfaces;
                    if (args.contentTypes && args.contentTypes.length > 0) {
                        contentTypes = contentTypes.filter(function (ct) {
                            return args.contentTypes.indexOf(ct.sys.id) >= 0;
                        });
                        editorInterfaces = editorInterfaces.filter(function (ei) {
                            return args.contentTypes.indexOf(ei.sys.contentType.sys.id) >= 0;
                        });
                    }
                    return [3 /*break*/, 35];
                case 4:
                    // get from space
                    if (!args.managementToken) {
                        throw new Error(source + " is not a file and I don't have a management token to talk to contentful.");
                    }
                    _c = parseEnv(source), spaceId = _c.spaceId, envId = _c.envId;
                    client = new client_1["default"]({
                        accessToken: args.managementToken,
                        spaceId: spaceId,
                        environmentId: envId
                    });
                    contentTypes = [];
                    editorInterfaces = [];
                    _k.label = 5;
                case 5:
                    _k.trys.push([5, 18, , 31]);
                    _k.label = 6;
                case 6:
                    _k.trys.push([6, 11, 12, 17]);
                    _d = __asyncValues(client.getContentTypes());
                    _k.label = 7;
                case 7: return [4 /*yield*/, _d.next()];
                case 8:
                    if (!(_e = _k.sent(), !_e.done)) return [3 /*break*/, 10];
                    ct = _e.value;
                    contentTypes.push(ct);
                    _k.label = 9;
                case 9: return [3 /*break*/, 7];
                case 10: return [3 /*break*/, 17];
                case 11:
                    e_1_1 = _k.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 17];
                case 12:
                    _k.trys.push([12, , 15, 16]);
                    if (!(_e && !_e.done && (_a = _d["return"]))) return [3 /*break*/, 14];
                    return [4 /*yield*/, _a.call(_d)];
                case 13:
                    _k.sent();
                    _k.label = 14;
                case 14: return [3 /*break*/, 16];
                case 15:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 16: return [7 /*endfinally*/];
                case 17: return [3 /*break*/, 31];
                case 18:
                    e_3 = _k.sent();
                    if (!/^404:/.test(e_3.message)) {
                        throw e_3;
                    }
                    // the source may not be a space - it might be an environment on the '--from' space
                    if (args.from == source) {
                        throw (e_3);
                    }
                    // we're loading the args.to, assume the same space ID as the args.from
                    spaceId = parseEnv(args.from).spaceId;
                    envId = source;
                    client = new client_1["default"]({
                        accessToken: args.managementToken,
                        spaceId: spaceId,
                        environmentId: envId
                    });
                    _k.label = 19;
                case 19:
                    _k.trys.push([19, 24, 25, 30]);
                    _f = __asyncValues(client.getContentTypes());
                    _k.label = 20;
                case 20: return [4 /*yield*/, _f.next()];
                case 21:
                    if (!(_g = _k.sent(), !_g.done)) return [3 /*break*/, 23];
                    ct = _g.value;
                    contentTypes.push(ct);
                    _k.label = 22;
                case 22: return [3 /*break*/, 20];
                case 23: return [3 /*break*/, 30];
                case 24:
                    e_2_1 = _k.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 30];
                case 25:
                    _k.trys.push([25, , 28, 29]);
                    if (!(_g && !_g.done && (_b = _f["return"]))) return [3 /*break*/, 27];
                    return [4 /*yield*/, _b.call(_f)];
                case 26:
                    _k.sent();
                    _k.label = 27;
                case 27: return [3 /*break*/, 29];
                case 28:
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 29: return [7 /*endfinally*/];
                case 30: return [3 /*break*/, 31];
                case 31:
                    if (args.contentTypes && args.contentTypes.length > 0) {
                        contentTypes = contentTypes.filter(function (ct) {
                            return args.contentTypes.indexOf(ct.sys.id) >= 0;
                        });
                    }
                    _i = 0, contentTypes_1 = contentTypes;
                    _k.label = 32;
                case 32:
                    if (!(_i < contentTypes_1.length)) return [3 /*break*/, 35];
                    ct = contentTypes_1[_i];
                    _j = (_h = editorInterfaces).push;
                    return [4 /*yield*/, client.getEditorInterface(ct.sys.id)];
                case 33:
                    _j.apply(_h, [_k.sent()]);
                    _k.label = 34;
                case 34:
                    _i++;
                    return [3 /*break*/, 32];
                case 35: return [2 /*return*/, {
                        id: source,
                        contentTypes: contentTypes,
                        editorInterfaces: editorInterfaces
                    }];
            }
        });
    });
}
function parseEnv(source) {
    var parts = source.split('/');
    return {
        spaceId: parts[0],
        envId: parts.length > 1 ? parts[1] : 'master'
    };
}
//# sourceMappingURL=source.js.map