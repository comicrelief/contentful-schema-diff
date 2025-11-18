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
exports.__esModule = true;
var diff_1 = require("./diff");
var utils_1 = require("./utils");
utils_1.extendPrototypes();
var diff = require('json-diff').diff;
var colorize = require('json-diff/lib/colorize').colorize;
function writeModify(from, to, write, context) {
    return __awaiter(this, void 0, void 0, function () {
        // writer functions
        function createField(field) {
            var fieldDef = Object.assign({}, field);
            delete (fieldDef.id);
            var create = "\n    " + v + ".createField('" + field.id + "', " + fieldDef.dump() + ")\n  ";
            create += moveField(field);
            return create;
        }
        function deleteField(field) {
            return "\n    " + v + ".deleteField('" + field.id + "')\n  ";
        }
        function moveField(field, oldField) {
            var move = "\n    " + v + ".moveField('" + field.id + "')";
            var newIndex = fieldIndex(to.fields, field);
            if (newIndex === 0) {
                move += "\n        .toTheTop()";
            }
            else {
                move += "\n        .afterField('" + to.fields[newIndex - 1].id + "')";
            }
            var changes = oldField && diff(oldField, field);
            if (changes) {
                move += modifyField(field, changes);
            }
            return move;
        }
        function modifyField(toField, fieldDiff) {
            var base = "\n    " + v + ".editField('" + toField.id + "')";
            Object.keys(fieldDiff).forEach(function (key) {
                var newValue = toField[key];
                base += "\n        ." + key + "(" + newValue.dump() + ")";
            });
            return base + '\n';
        }
        function reDiff(id) {
            var toField = to.fields.find(function (f) { return f.id == id; });
            var fromField = from.fields.find(function (f) { return f.id == id; });
            if (!toField || !fromField) {
                throw new Error("Unable to find field " + id + " in re-diff of " + to.name);
            }
            var d = diff(fromField, toField);
            return d ? { field: toField, diff: d } : null;
        }
        var v, fromTypeDef, toTypeDef, typeDefDiff, fieldsDiff, created, deleted, modified, fromFieldIndex, toFieldIndex, moved;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    context.operations.push('modify');
                    v = from.sys.id.camelCase();
                    fromTypeDef = Object.assign({}, to);
                    delete (fromTypeDef.fields);
                    delete (fromTypeDef.sys);
                    toTypeDef = Object.assign({}, to);
                    delete (toTypeDef.fields);
                    delete (toTypeDef.sys);
                    typeDefDiff = diff(fromTypeDef, toTypeDef);
                    fieldsDiff = diff(from.fields, to.fields);
                    if (empty(typeDefDiff) && empty(fieldsDiff)) {
                        return [2 /*return*/];
                    }
                    if (!empty(typeDefDiff)) return [3 /*break*/, 2];
                    return [4 /*yield*/, write("\n  const  " + v + " = migration.editContentType('" + from.sys.id + "')\n  ")];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, write("\n  const " + v + " = migration.editContentType('" + from.sys.id + "', " + toTypeDef.dump() + ")\n")];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    context.varname = v;
                    return [4 /*yield*/, write("\n  /*\n" + colorize(fieldsDiff, { color: false }) + " */\n  ")];
                case 5:
                    _a.sent();
                    created = new Map();
                    deleted = new Map();
                    modified = new Map();
                    fromFieldIndex = 0;
                    toFieldIndex = 0;
                    fieldsDiff.forEach(function (item) {
                        var val = item[1];
                        switch (item[0]) {
                            case '+':
                                if (val && !diff_1.isDiffObj(val)) {
                                    created.set(val.id, val);
                                }
                                else {
                                    throw new Error('Diff produced a "+" with a diff obj:\n' + JSON.stringify(item));
                                }
                                toFieldIndex++;
                                break;
                            case '-':
                                if (val && !diff_1.isDiffObj(val)) {
                                    deleted.set(val.id, val);
                                }
                                else {
                                    throw new Error('Diff produced a "-" with a diff obj:\n' + JSON.stringify(item));
                                }
                                fromFieldIndex++;
                                break;
                            case '~':
                                if (val && diff_1.isDiffObj(val)) {
                                    modified.set(to.fields[toFieldIndex].id, { field: to.fields[toFieldIndex], diff: val });
                                }
                                else {
                                    throw new Error('Diff produced a "~" with a non-diff obj:\n' + JSON.stringify(item));
                                }
                                fromFieldIndex++;
                                toFieldIndex++;
                                break;
                            default:
                                fromFieldIndex++;
                                toFieldIndex++;
                                break;
                        }
                    });
                    moved = new Map();
                    modified.forEach(function (val) {
                        if (val && val.diff && val.diff.id && diff_1.isSimpleDiff(val.diff.id) && created.has(val.diff.id.__old)) {
                            // A new field was inserted just before this field and the diff got confused
                            created["delete"](val.diff.id.__old);
                            created.set(val.field.id, val.field);
                            // re-diff the old field that was moved to see if we had any changes
                            val = reDiff(val.diff.id.__old);
                        }
                        if (val && val.diff) {
                            write(modifyField(val.field, val.diff));
                        }
                    });
                    created.forEach(function (val, key) {
                        if (deleted.has(key)) {
                            moved.set(key, val);
                            created["delete"](key);
                        }
                        else {
                            write(createField(val));
                        }
                    });
                    moved.forEach(function (val, key) {
                        write(moveField(val, deleted.get(key)));
                        deleted["delete"](key);
                    });
                    deleted.forEach(function (val) { return write(deleteField(val)); });
                    return [2 /*return*/];
            }
        });
    });
}
exports.writeModify = writeModify;
// utilities
function empty(arr) {
    return !arr || arr.length === 0;
}
function fieldIndex(fields, field) {
    return fields.map(function (f) { return f.id; }).indexOf(field.id);
}
//# sourceMappingURL=modify.js.map