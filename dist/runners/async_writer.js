"use strict";
exports.__esModule = true;
function asyncWriter(stream) {
    var draining = true;
    var drainPromise = null;
    function doWrite(chunk) {
        return new Promise(function (resolve, reject) {
            if (draining) {
                draining = stream.write(chunk, function (err) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            }
            else {
                if (!drainPromise) {
                    drainPromise = new Promise(function (dpResolve) {
                        stream.once('drain', function () {
                            drainPromise = null;
                            draining = true;
                            dpResolve();
                        });
                    });
                }
                // await recursive
                drainPromise.then(function () {
                    return doWrite(chunk)
                        .then(resolve)["catch"](reject);
                }, function (err) { return reject(err); });
            }
        });
    }
    return doWrite;
}
exports.asyncWriter = asyncWriter;
//# sourceMappingURL=async_writer.js.map