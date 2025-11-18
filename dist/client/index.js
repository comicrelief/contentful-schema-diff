"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var node_fetch_1 = __importDefault(require("node-fetch"));
var url_1 = require("url");
var utils_1 = require("../utils");
var SimpleCMAClient = /** @class */ (function () {
    function SimpleCMAClient(options, fetch) {
        if (fetch === void 0) { fetch = node_fetch_1["default"]; }
        this.fetch = fetch;
        this.options = __assign({ baseUrl: 'https://api.contentful.com', spaceId: process.env.CONTENTFUL_SPACE_ID, accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN, environmentId: process.env.CONTENTFUL_ENVIRONMENT || 'master' }, options);
    }
    SimpleCMAClient.prototype.getContentType = function (contentType) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, spaceId, environmentId, resp;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.options, spaceId = _a.spaceId, environmentId = _a.environmentId;
                        return [4 /*yield*/, this.get("/spaces/" + spaceId + "/environments/" + environmentId + "/content_types/" + contentType)];
                    case 1:
                        resp = _b.sent();
                        return [4 /*yield*/, resp.json()];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    SimpleCMAClient.prototype.getContentTypes = function (limit) {
        if (limit === void 0) { limit = 100; }
        return __asyncGenerator(this, arguments, function getContentTypes_1() {
            var _a, spaceId, environmentId, skip, total, resp, body, _i, _b, item;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.options, spaceId = _a.spaceId, environmentId = _a.environmentId;
                        skip = 0;
                        _c.label = 1;
                    case 1: return [4 /*yield*/, __await(this.get("/spaces/" + spaceId + "/environments/" + environmentId + "/content_types", {
                            skip: skip.toString(),
                            limit: limit.toString()
                        }))];
                    case 2:
                        resp = _c.sent();
                        return [4 /*yield*/, __await(resp.json())];
                    case 3:
                        body = _c.sent();
                        if (!(body.items.length == 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, __await(void 0)];
                    case 4: return [2 /*return*/, _c.sent()];
                    case 5:
                        _i = 0, _b = body.items;
                        _c.label = 6;
                    case 6:
                        if (!(_i < _b.length)) return [3 /*break*/, 10];
                        item = _b[_i];
                        return [4 /*yield*/, __await(item)];
                    case 7: return [4 /*yield*/, _c.sent()];
                    case 8:
                        _c.sent();
                        _c.label = 9;
                    case 9:
                        _i++;
                        return [3 /*break*/, 6];
                    case 10:
                        skip = skip + limit;
                        total = body.total;
                        _c.label = 11;
                    case 11:
                        if (skip < total) return [3 /*break*/, 1];
                        _c.label = 12;
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    SimpleCMAClient.prototype.getEditorInterface = function (contentType) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, spaceId, environmentId, resp;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.options, spaceId = _a.spaceId, environmentId = _a.environmentId;
                        return [4 /*yield*/, this.get("/spaces/" + spaceId + "/environments/" + environmentId + "/content_types/" + contentType + "/editor_interface")];
                    case 1:
                        resp = _b.sent();
                        return [4 /*yield*/, resp.json()];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    SimpleCMAClient.prototype.get = function (path, query) {
        if (query === void 0) { query = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var url, resp, reset;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = new url_1.URL(path, this.options.baseUrl);
                        Object.keys(query).forEach(function (k) {
                            url.searchParams.set(k, query[k]);
                        });
                        _a.label = 1;
                    case 1: return [4 /*yield*/, this.fetch(url.toString(), {
                            method: 'GET',
                            headers: {
                                Authorization: "Bearer " + this.options.accessToken
                            },
                            redirect: 'follow'
                        })];
                    case 2:
                        resp = _a.sent();
                        if (resp.status == 404) {
                            throw new NotFoundError("404: " + path);
                        }
                        if (!(resp.status == 429)) return [3 /*break*/, 4];
                        reset = resp.headers.get('x-contentful-ratelimit-second-limit');
                        if (!reset) {
                            throw new Error("Rate-limited with no X-Contentful-RateLimit-Reset header!");
                        }
                        return [4 /*yield*/, utils_1.wait(parseFloat(reset) * 1000)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        if (resp.status != 200) {
                            throw new Error("Unexpected status code " + resp.status + " for '" + path + "'");
                        }
                        _a.label = 5;
                    case 5:
                        if (resp.status != 200) return [3 /*break*/, 1];
                        _a.label = 6;
                    case 6: return [2 /*return*/, resp];
                }
            });
        });
    };
    return SimpleCMAClient;
}());
exports["default"] = SimpleCMAClient;
// tslint:disable-next-line: max-classes-per-file
var NotFoundError = /** @class */ (function (_super) {
    __extends(NotFoundError, _super);
    function NotFoundError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NotFoundError;
}(Error));
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=index.js.map