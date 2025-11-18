"use strict";
exports.__esModule = true;
function writeDelete(id, write, context) {
    if (context) {
        context.operations.push('delete');
    }
    return write("\n  migration.deleteContentType('" + id + "')\n");
}
exports.writeDelete = writeDelete;
//# sourceMappingURL=delete.js.map