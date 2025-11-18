"use strict";
exports.__esModule = true;
function isDiff(obj) {
    return isDiffArray(obj) || isDiffObj(obj);
}
exports.isDiff = isDiff;
function isDiffObj(obj) {
    if (typeof obj != 'object' || Object.keys(obj).length == 0) {
        return false;
    }
    return Object.keys(obj).every(function (key) {
        var val = obj[key];
        return isSimpleDiff(val) || isDiff(val);
    });
}
exports.isDiffObj = isDiffObj;
function isDiffArray(arr) {
    if (!Array.isArray(arr)) {
        return false;
    }
    return arr.every(isDiffItem);
}
exports.isDiffArray = isDiffArray;
function isDiffItem(val) {
    if (!Array.isArray(val)) {
        return false;
    }
    if (val.length <= 0 || val.length > 2) {
        return false;
    }
    return val[0] == ' ' ||
        val[0] == '~' ||
        val[0] == '+' ||
        val[0] == '-';
}
exports.isDiffItem = isDiffItem;
function isSimpleDiff(diff) {
    var obj = diff;
    return obj.__old !== undefined || obj.__new !== undefined;
}
exports.isSimpleDiff = isSimpleDiff;
//# sourceMappingURL=diff.js.map